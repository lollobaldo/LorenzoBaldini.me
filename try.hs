countt :: String -> String -> Int
countt s xs | length xs < l = 0
            | take l xs == s = 1 + (countt s . drop l) xs
            | otherwise = (countt s . drop 1) xs
  where
    l = length s

concS :: [(a,[b])] -> [(a,b)]
concS ls = [(a,b) | (a,x) <- ls, b <- x]

homerge :: Ord b => (a -> b) -> [a] -> [a] -> [a]
homerge _ xs [] = xs
homerge _ [] ys = ys
homerge f (x:xs) (y:ys) | f x < f y = x : homerge f xs (y:ys)
                        | otherwise = y : homerge f (x:xs) ys
