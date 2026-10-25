package com.upsc.maptrainer.ui.map

import kotlin.math.cos

object MapProjection {
    private const val COS_22 = 0.927183854 // cos(22 degrees in radians)
    private const val REF_LON = 67.5
    private const val REF_LAT = 38.0

    /**
     * Equirectangular projection matching the prompt:
     * x = (lon - 67.5) * cos(22 deg)
     * y = 38 - lat
     */
    fun project(lon: Double, lat: Double): Pair<Float, Float> {
        val x = ((lon - REF_LON) * COS_22).toFloat()
        val y = (REF_LAT - lat).toFloat()
        return Pair(x, y)
    }

    /**
     * Inverse projection from normalized map coordinates back to (lon, lat).
     */
    fun unproject(x: Float, y: Float): Pair<Double, Double> {
        val lon = (x.toDouble() / COS_22) + REF_LON
        val lat = REF_LAT - y.toDouble()
        return Pair(lon, lat)
    }
}
