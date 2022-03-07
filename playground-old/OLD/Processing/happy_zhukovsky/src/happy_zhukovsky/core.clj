(ns happy_zhukovsky.core
  (:require [quil.core :as q]
            [happy_zhukovsky.dynamic :as d]
            [quil.middleware :as m]))

(q/defsketch happy_zhukovsky
  :size [500 500]
  :setup d/setup
  :update d/update-state
  :draw d/draw-state
  :features [:keep-on-top]
  :middleware [m/fun-mode])
