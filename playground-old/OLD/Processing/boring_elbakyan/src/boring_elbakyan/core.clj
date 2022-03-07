(ns boring_elbakyan.core
  (:require [quil.core :as q]
            [boring_elbakyan.dynamic :as d]))

(q/defsketch boring_elbakyan
  :size [500 500]
  :setup d/setup
  :draw d/draw-state
  :features [:keep-on-top])
