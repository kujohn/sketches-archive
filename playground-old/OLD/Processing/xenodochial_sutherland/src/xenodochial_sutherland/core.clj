(ns xenodochial_sutherland.core
  (:require [quil.core :as q :include-macros true]
            [xenodochial_sutherland.dynamic :as d]))

(q/defsketch xenodochial_sutherland
  :size [700 700]
  :setup d/setup
  :draw d/draw-state
  :features [:keep-on-top])
