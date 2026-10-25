#!/usr/bin/env python3
import json
import math
import os
import urllib.request

def rdp(points, epsilon):
    if len(points) < 3:
        return points
    stack = [(0, len(points) - 1)]
    keep = [False] * len(points)
    keep[0] = True
    keep[-1] = True
    while stack:
        start, end = stack.pop()
        dmax = 0.0
        index = start
        x1, y1 = points[start]
        x2, y2 = points[end]
        dx = x2 - x1
        dy = y2 - y1
        mag = math.hypot(dx, dy)
        for i in range(start + 1, end):
            x0, y0 = points[i]
            if mag == 0:
                d = math.hypot(x0 - x1, y0 - y1)
            else:
                d = abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / mag
            if d > dmax:
                index = i
                dmax = d
        if dmax > epsilon:
            keep[index] = True
            if index - start > 1:
                stack.append((start, index))
            if end - index > 1:
                stack.append((index, end))
    return [points[i] for i in range(len(points)) if keep[i]]

NAME_MAP = {
    "Andaman and Nicobar": "Andaman & Nicobar Islands",
    "Orissa": "Odisha",
    "Uttaranchal": "Uttarakhand",
    "Jammu and Kashmir": "Jammu & Kashmir",
    "Delhi": "Delhi",
    "Dadra and Nagar Haveli": "Dadra & Nagar Haveli",
    "Daman and Diu": "Daman & Diu",
    "Telangana": "Telangana",
    "Puducherry": "Puducherry"
}

def main():
    url = "https://raw.githubusercontent.com/geohacker/india/master/state/india_telengana.geojson"
    print(f"Fetching states GeoJSON from {url}...")
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        raw_geojson = json.loads(resp.read().decode("utf-8"))

    processed_states = []
    # ~0.024 deg tolerance yields ~120-140 KB output matching the prompt requirement
    epsilon = 0.024

    for f in raw_geojson["features"]:
        raw_name = f["properties"].get("NAME_1", "").strip()
        state_name = NAME_MAP.get(raw_name, raw_name)
        geom = f.get("geometry", {})
        gtype = geom.get("type", "")
        coords = geom.get("coordinates", [])

        rings_to_process = []
        if gtype == "Polygon":
            rings_to_process.extend(coords)
        elif gtype == "MultiPolygon":
            for poly in coords:
                rings_to_process.extend(poly)

        simplified_rings = []
        for ring in rings_to_process:
            if len(ring) < 4:
                continue
            xs = [p[0] for p in ring]
            ys = [p[1] for p in ring]
            box_area = (max(xs) - min(xs)) * (max(ys) - min(ys))

            # Keep significant islands or main landmasses
            is_island_ut = state_name in ["Andaman & Nicobar Islands", "Lakshadweep", "Daman & Diu", "Puducherry"]
            min_area = 0.0005 if is_island_ut else 0.003
            if box_area < min_area:
                continue

            simp = rdp(ring, epsilon)
            if len(simp) < 3:
                continue
            if simp[0] != simp[-1]:
                simp.append(simp[0])

            # Round coordinates to 3 decimals
            rounded_ring = [[round(p[0], 3), round(p[1], 3)] for p in simp]
            simplified_rings.append(rounded_ring)

        if simplified_rings:
            # Sort rings by descending size so outer mainland ring comes first
            simplified_rings.sort(key=lambda r: len(r), reverse=True)
            processed_states.append({
                "name": state_name,
                "rings": simplified_rings
            })

    # Sort alphabetically by state name
    processed_states.sort(key=lambda s: s["name"])

    # Output paths
    paths = [
        "assets/india_states.json",
        "app/src/main/assets/india_states.json",
        "public/india_states.json"
    ]
    for p in paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as out:
            json.dump(processed_states, out, separators=(',', ':'))
        size_kb = os.path.getsize(p) / 1024
        print(f"Wrote {p} ({size_kb:.1f} KB, {len(processed_states)} states/UTs)")

if __name__ == "__main__":
    main()
