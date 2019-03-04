import Data.Char

f [] = True
f(x:xs) = and [if (even i == alf) then (isAlpha a) else (not (isAlpha a))
                | (i,a) <- zip [0..] (x:xs)]
            where               --NOTE: this where is outside the list comprehension
              alf = isAlpha x   --NOTE: f is NOT recursive, so alf will have one and only one value, which is wether the first char is alpha or not

prop_f = f "" && not (f "Oops")
              && f ".I-n-F1A"
              && f "I O U"
              && f "0"          --wasn't sure what the sheet says but both 0 and O should return True
              && f "O"
              && not (f "..-. .--.")