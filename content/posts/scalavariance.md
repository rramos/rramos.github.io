---
title: Scala Variance
date: "2024-01-02T10:00:00+00:00"
lang: en
tags:
  - Software Development
  - Scala
---

In this article we will go through Scala Variance

## Intro ##

Variance lets you control how type parameters behave with regards to subtyping. Scala supports variance annotations of type parameters of generic classes, to allow them to be covariant, contravariant, or invariant if no annotations are used. The use of variance in the type system allows us to make intuitive connections between complex types.

> Variance: If B Extends A, Should List[B] extend List[A] ?

### Invariance ###

By **default**, type parameters in Scala are invariant: subtyping relationships between the type parameters aren’t reflected in the parameterized type.

```scala
trait List[A]
```

Example

```scala
class Box[A](var content: A)
```

We’re going to be putting values of type `Animal` in it. This type is defined as follows:

```scala
abstract class Animal {
  def name: String
}
case class Cat(name: String) extends Animal
case class Dog(name: String) extends Animal
```

We can say that `Cat` is a subtype of `Animal`, and that `Dog` is also a subtype of `Animal`. That means that the following is well-typed:

```scala
val myAnimal: Animal = Cat("Felix")
```

What about boxes? Is `Box[Cat]` a subtype of `Box[Animal]`, like `Cat` is a subtype of `Animal`?

```scala
val myCatBox: Box[Cat] = new Box[Cat](Cat("Felix"))
val myAnimalBox: Box[Animal] = myCatBox // this doesn't compile
```

Although this is valid

```scala
val myAnimal: Animal = myAnimalBox.content
myAnimalBox.content = Dog("Fido")
```

From this, we have to conclude that `Box[Cat]` and `Box[Animal]` can’t have a subtyping relationship, even though `Cat` and `Animal` do.

### Covarience ###

The The problem we ran in to above, is that because we could put a Dog in an Animal Box, a Cat Box can’t be an Animal Box.

```scala
trait List[+A]
```

Example:

```scala
class ImmutableBox[+A](val content: A)
val catbox: ImmutableBox[Cat] = new ImmutableBox[Cat](Cat("Felix"))
val animalBox: ImmutableBox[Animal] = catbox // now this compiles
```

We say that ImmutableBox is **covariant** in `A`, and this is indicated by the `+` before the `A`.

### Contravarience ###

We’ve seen we can accomplish covariance by making sure that we can’t put something in the covariant type, but only get something out. What if we had the opposite, something you can put something in, but can’t take out?

```scala
trait List[-A]
```

Example:

```scala
abstract class Serializer[-A] {
  def serialize(a: A): String
}

val animalSerializer: Serializer[Animal] = new Serializer[Animal] {
  def serialize(animal: Animal): String = s"""{ "name": "${animal.name}" }"""
}
val catSerializer: Serializer[Cat] = animalSerializer
catSerializer.serialize(Cat("Felix"))
```

We say that `Serializer` is contravariant in `A`, and this is indicated by the `-` before the `A`. A more general serializer is a subtype of a more specific serializer.

More formally, that gives us the reverse relationship: given some class `Contra[-T]`, then if `A` is a subtype of `B`, `Contra[B]` is a subtype of `Contra[A]`.

## Bounded Types ##

The type of Variance would lead to have members defined with upper or lower bounded types like the following example.

```scala
class Car
class SuperCar extends Car
class Garage[T <: Car>](car: T)
```

More details on bounded values on the following articles:

* <https://docs.scala-lang.org/tour/upper-type-bounds.html>
* <https://docs.scala-lang.org/tour/lower-type-bounds.html>

## Immutability and Variance ##

Immutability constitutes an important part of the design decision behind using variance. For example, Scala’s collections systematically distinguish between mutable and immutable collections. The main issue is that a covariant mutable collection can break type safety. This is why List is a covariant collection, while scala.collection.mutable.ListBuffer is an invariant collection.

## Comparison With Other Languages ##

Variance is supported in different ways by some languages that are similar to Scala. Scala’s tendency towards immutable types makes it that covariant and contravariant types are more common than in other languages, since a mutable generic type must be invariant.

## Reference ##

* <https://docs.scala-lang.org/tour/variances.html>
* <https://docs.scala-lang.org/tour/upper-type-bounds.html>
* <https://docs.scala-lang.org/tour/lower-type-bounds.html>
