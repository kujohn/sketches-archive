(ns quirky_euler.core
  (:require [quil.core :as q :include-macros true]
            [quirky_euler.dynamic :as d]
            [quil.middleware :as m]))

(q/defsketch quirky_euler
  :size [500 500]
  :setup d/setup
  :update d/update-state
  :draw d/draw-state
  :features [:keep-on-top]
  :middleware [m/fun-mode])
