data Tree a = NoData
            | Data a
            | Leaf (Tree a) (Tree a)
            deriving (Show, Eq)

data Direction = Left
               | Right
               deriving (Show, Eq)


tree  = Leaf (Data 2) (Leaf (Data 5) NoData)
tree2 = Leaf NoData NoData
tree3 = Leaf NoData (Data 5)

findPath :: Eq a => a -> Tree a -> [Direction]
findPath _ NoData = []
findPath a (Data x) = []
findPath a (Leaf x y)
    | isItHere a x = Main.Left  : findPath a x
    | otherwise    = Main.Right : findPath a y

isItHere :: Eq a => a -> Tree a -> Bool
isItHere _ NoData = False
isItHere a (Data x) = a == x
isItHere a (Leaf x y) = isItHere a x || isItHere a y

g _ _ [] _     = []
g _ _ (x:xs) b = [_]