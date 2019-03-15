data Foo a = Baz String (Qux -> Foo a) | Bar a
data Qux = None | Quux String

instance Functor Foo where
  fmap f (Bar a) = Bar (f a)
  -- fmap f (Baz s ???) = Baz s (???) -- What goes here?

  -- Clearly, something like this doesn't work
  fmap f (Baz s g) = Baz s (helper)
    where
      helper (Bar a) = Bar (f a)
      helper x = fmap f x

  -- I've also tried something like this, but I'm not sure where to go from there
  -- fmap f (Baz s (None   -> Bar b)) = Baz s (f b) ???
  -- fmap f (Baz s (Just x -> Bar b)) = Baz s ???