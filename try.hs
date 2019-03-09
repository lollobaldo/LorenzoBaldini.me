countt :: String -> String -> Int
countt s xs | length xs < l = 0
            | take l xs == s = 1 + (countt s . drop l) xs
            | otherwise = (countt s . drop 1) xs
  where
    l = length s

concS :: [(a,[b])] -> [(a,b)]
concS ls = [(a,b) | (a,x) <- ls, b <- x]

a :: Fractional a => a
a = 1.0

b :: Double
b = 1.0

c :: Float
c = 1.0