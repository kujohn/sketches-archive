; ref, sync coor
(def rcurrent (ref 123))
(dosync (ref-set rcurrent (inc @rcurrent)))
(println @rcurrent)

; atom, sync uncoor
(def current ( atom "abc"))
(reset! current "xyz")
(println @current)


; agent, async
(def xxx (agent 0 :validator number? :error-handler (fn [_] (println "there was an error"))))
(send xxx (fn [_] "aaa"))
(println @xxx)

