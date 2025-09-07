> _Overview: We introduce a few critical set families, including fields, σ-fields, and π & λ systems._

## Fields and $\sigma$-Fields

In this section, we will introduce one of the most critical definitions in measure theory, one that is the first piece of scaffolding upon which the rest is built. For completeness' sake, however, we first introduce a related definition.



<div class="callout definition"><span class="label">Definition: Field</span><br/>
Let $\Omega$ be a space. A class $\mathcal{F}_0$ on $\Omega$ is called a <strong><em>field</strong></em> or an <strong><em>algebra</strong></em> if the following properties hold:
<ol type="i">
  <li>$\Omega \in \mathcal F_0$.</li>
  <li>For all sets $A \in \mathcal F$, $A^c \in \mathcal F$.</li>
  <li>For sets $A_1, A_2 \in \mathcal F_0, A_1 \cup A_2 \in \mathcal F_0$.</li>
</ol>
</div>



The second and third properties are named <i>closure under complementation</i> and <i>closure under finite unions</i>, respectively. The name of the latter is not precisely what property three states, but that the union of any finite $k$ number of sets is an element of the field can easily be shown by mathematical induction. The way we write the definition is for conciseness and ease of subsequent proofs.

Fields have a few other important properties we would like to highlight.



<div class="callout proposition"><span class="label">Proposition: Fields are Closed Under Finite Intersections</span><br/>
Let $\Omega$ be a space and $\mathcal F_0$ be a field on $\Omega$. Then $\mathcal F_0$ is <i>closed under finite intersections</i>.
</div>



<details class="collapsible">
  <summary>Proof</summary>
  <div class="collapsible__content">

  By the same induction reasoning as above, it suffices to show that, for any sets $A_1, A_2 \in \mathcal F_0$, $A_1 \cap A_2 \in \mathcal F_0$.

  By DeMorgan's laws, we have that

  $$ A_1 \cap A_2 = (A_1^c \cup A_2^c)^c. $$

  Since $A_1, A_2 \in \mathcal F_0$ and $\mathcal F_0$ is closed under complementation, $A_1^c, A_2^c \in \mathcal F_0$. Since $\mathcal F_0$ is closed under finite unions, $A_1^c \cup A_2^c \in \mathcal F_0$. Again, since $\mathcal F_0$ is closed under complementation, $(A_1^c \cup A_2^c)^c = A_1 \cap A_2 \in \mathcal F_0$.

  </div>
</details>



We will introduce some intuition into why the definition is as above after the next definition, using its connection and usefulness to probability. Here, however, we note some important things to keep in mind when thinking about fields. 

First, note the difference between <i>subset of</i> and <i>element of</i>. A field $\mathcal F_0$ defined on a space $\Omega$ is a set of sets, whose elements are subsets of the larger space $\Omega$. <i>All</i> elements in $\mathcal F_0$ are contained in the entire space, $\Omega$. $\Omega$ is itself necessarily an element of $\mathcal F_0$. 

One of the most important facts to remember is that $A \in \mathcal F_0$ <i>does not mean</i> that subsets of $A$ must also be elements of the field.

We now focus our attention on a specific type of field, called a $\sigma$-field. This definition turns out to be far more versatile and important than that of the field.



<div class="callout definition"><span class="label">Definition: $\sigma$-Field</span><br/>
Let $\Omega$ be a space. A class $\mathcal{F}$ on $\Omega$ is called a <strong><em>$\sigma$-field</strong></em> or a <strong><em>$\sigma$-algebra</strong></em> if the following properties hold:
<ol type="i">
  <li>$\Omega \in \mathcal F$.</li>
  <li>For all sets $A \in \mathcal F$, $A^c \in \mathcal F$.</li>
  <li>For sets $A_1, A_2 \ldots A_n \ldots \in \mathcal F, \bigcup_{i = 1}^\infty A_i \in \mathcal F$.</li>
</ol>
</div>



The terminology $\sigma$ comes from the notion of properties that hold under <i>countable</i> operations; we will see quite a few examples of this. Here, we again note a few important properties of $\sigma$-fields. 

The first is that $\sigma$-fields are fields. They are simply a special case of fields. This is easily seen by the overlap in conditions 1 and 2, and taking the countable union of $k$ sets of interest and taking $A_{n} = \varnothing$ for any $n > k$. This is functionally the union of a finite number of sets.

The second is that, although $\sigma$-fields are fields, they are <i>much much larger</i> than fields. Requiring every union of a countable number of sets, as opposed to just every finite number, expands the size of the field in a way that is difficult to comprehend. In fact, as we will later see, there is a nice characterization of a specific type of field that does not apply, in general, to $\sigma$-fields.

For now, we just provide an example of a field that is not a $\sigma$-field.



<div class="callout example"><span class="label">Example: The Class of Finite and Co-Finite Sets is a Field but not a $\sigma$-Field</span><br/>

Let $\Omega = \mathbb N$, the set of natural numbers. Consider the family of sets

$$ \mathcal F_0 = \\{ A: |A| < \infty \text{ or } |A^c| < \infty \\}, $$

i.e. the sets that are finite or co-finite. This set is a field but not a $\sigma$-field.

We note that even for different spaces, i.e. even if $\Omega \neq \mathbb N$, this still holds. We use the set of natural numbers for simplicity and concreteness. However, one thing of note is that $\mathcal F_0$ is not a $\sigma$-field only if $\Omega$ is infinite.

</div>



<details class="collapsible">
  <summary>Proof</summary>
  <div class="collapsible__content">

  We first verify that this is a field.
  <ol type="i">
      <li>$\Omega^c = \varnothing$ has cardinality 0, clearly finite, so $\Omega$ is co-finite.</li>
      <li>Let $A \in \mathcal F_0$. Then either $|A| < \infty$ or $|A^c| < \infty$. Then, clearly, $A^c \in \mathcal F_0$.</li>
      <li>Suppose $A_1, A_2\in \mathcal F_0$. Suppose first that $|A_1|, |A_2| < \infty$. Then $|A_1 \cup A_2| < \infty$, so $A_1 \cup A_2 \in \mathcal F_0$. Now suppose that at least one of the sets is co-finite---without loss of generality, suppose it is $A_1$. Then $(A_1 \cup A_2)^c \subseteq A_1^c$, so $|(A_1 \cup A_2)^c| \leq |A_1^c| < \infty$, so $A_1 \cup A_2$ must be co-finite.</li>
  </ol>
  Now we show that $\mathcal F_0$ is not a $\sigma$-field. Consider a countably infinite number of distinct <i>singletons</i>&mdash;sets containing only one element each from the space&mdash;whose union is also countably infinite, e.g. the set of even numbers. This set is itself not finite, but it is also not co-finite: its complement, the set of odd numbers, is also countably infinite. Clearly, however, this argument does not apply if $\Omega$ is finite.

  Thus, the family of finite and co-finite subsets of the natural numbers is a field, but not a $\sigma$-field.

  </div>
</details>



We now present another, similar example, one that <i>is</i> a $\sigma$-field.



<div class="callout example"><span class="label">Example: The Class of Countable and Co-Countable Sets is $\sigma$-Field</span><br/>

Let $\Omega = \mathbb N$, the set of natural numbers. Consider the family of sets

$$ \mathcal F_0 = \\{ A: A \text{ is countable or } A^c \text{ is countable} \\}, $$

i.e. the sets that are countable or co-countable. This set is a $\sigma$-field.

</div>



<details class="collapsible">
  <summary>Proof</summary>
  <div class="collapsible__content">

  We verify the three conditions.
  <ol type="i">
      <li>As before, $\Omega^c = \varnothing$ is clearly countable. Thus, $\Omega \in \mathcal F$.</li>
      <li>Suppose that $A \in \mathcal F$. Then either $A$ or $A^c$ is countable. Thus, $A^c \in \mathcal F$.</li>
      <li>Suppose $A_n \in \mathcal F$ for $n \in \mathbb N$. Suppose first that $A_n$ is countable for all $n \in \mathbb N$. Then, because the countable union of countable elements is countable, $\bigcup_{n = 1}^\infty A_n \in \mathcal F$. Now suppose that there exists some $A_k$ that is co-countable. Then $\left(\bigcup_{n = 1}^\infty A_n \right)^c \subseteq A_k^c$, which is countable, and the countable union $\bigcup_{n = 1}^\infty A_n \in \mathcal F$.</li>
  </ol>

  </div>
</details>



<div class="callout proposition"><span class="label">Proposition: The Intersection of $\sigma$-Fields is a $\sigma$-Field, but not the Union </span><br/>

Let $\Omega$ be a space, and let $\mathcal F_1$ and $\mathcal F_2$ be $\sigma$-fields on the space. We show that $\mathcal F_1 \cap \mathcal F_2$ is a $\sigma$-field. Contrarily, we show that the union of two $\sigma$-fields, $\mathcal F_1 \cup \mathcal F_2$, is not necessarily a $\sigma$-field.

</div>



<details class="collapsible">
  <summary>Proof</summary>
  <div class="collapsible__content">

  We show that $\mathcal F_1 \cap \mathcal F_2$ is a $\sigma$-field.   
  <ol type="i">
    <li>$\Omega \in \mathcal F_1, \mathcal F_2$ means that $\Omega \in \mathcal F_1 \cap \mathcal F_2$.</li>
    <li>Suppose $A \in \mathcal F_1 \cap \mathcal F_2$. Then $A \in \mathcal F_1,\mathcal F_2$, so $A^c \in \mathcal F_1,\mathcal F_2$, and hence $A^c \in \mathcal F_1 \cap \mathcal F_2$.</li>
    <li>Suppose $A_1, A_2 \ldots \in \mathcal F_1 \cap \mathcal F_2$. Then $A_1, A_2 \ldots \in \mathcal F_1, \mathcal F_2$, so $\bigcup_{n = 1}^\infty A_n \in \mathcal F_1, \mathcal F_2$, and hence $\bigcup_{n = 1}^\infty A_n \in \mathcal F_1 \cap \mathcal F_2$.</li>
  </ol>

  We provide a counterexample to show that $\mathcal F_1 \cup \mathcal F_2$ is not necessarily a $\sigma$-field.

  Let $A, B$ be subsets of $\Omega$.
  Let $\mathcal F_1 = \{\varnothing, A, A^c \Omega\}$, and let $\mathcal F_2 = \{\varnothing, B, B^c, \Omega\}$.

  Then $\mathcal F_1 \cup \mathcal F_2 = \{\varnothing, A, B, A^c, B^c, \Omega\}$. However, $A \cup B \notin \mathcal F_1 \cup \mathcal F_2$, so $\mathcal F_1 \cup \mathcal F_2$ is not closed under unions, and hence not a $\sigma$-field.

  </div>
</details>



There are two $\sigma$-fields on a space that come "for free" with the space $\Omega$. One is useful, one often isn't. The first is the set $\\{\varnothing, \Omega\\}$. This $\sigma$-field contains only the entire space itself and the empty set. It is easily verified as a valid field and $\sigma$-field. This is called the <i>trivial $\sigma$-algebra</i>.



<div class="callout definition"><span class="label">Definition: Trivial $\sigma$-Field</span><br/>

Let $\Omega$ be a space. The $\sigma$-field defined by $\mathcal F = \\{\varnothing, \Omega\\}$ is called the <strong><em>trivial $\sigma$-field</strong></em>.

</div>



The other $\sigma$-field that is "automatically" defined for a space $\Omega$ is the power set, $2^\Omega$. However, in practice, this $\sigma$-algebra is often not possible to work with (for some topological reasons).

Now, we finally give an intuition on the necessity of $\sigma$-fields, and why they are defined the way they are.

Our objective with defining $\sigma$-fields is to make probability rigorous. It turns out that directly assigning probabilities to each outcome in the space is often not possible. Think of the continuous random variable: each outcome has probability 0. Or alternatively, think of an infinite sequence of fair coin tosses. Each specific outcome should be considered exactly equally likely, but all outcomes have probability 0. But the sample space must still sum to probability 1. Hence, assigning probabilities to each outcome is infeasible. Thus, it appears that we need to be careful about which sets we say that we can assign probabilities to. 

We also need that the probabilities we assign "make sense". For example, for two disjoint events, we need that their probabilities sum&mdash;the probability of their union is the sum of the probabilities. We also need that the probability of an event and its complement sum to one. Clearly, then, if we say that we can measure the probabilities of specific sets, we must also need to be able to measure the probabilities of certain related sets: the complement, the union, and the intersection.

We see that this gives us some understanding of how large and complex $\sigma$-fields can be. As stated above, the trivial (smallest) $\sigma$-field contains only two elements, $\Omega$ and $\varnothing$. Let us do a thought experiment: suppose we add another event in the $\sigma$-field, which represents an event whose probability we know we can measure. Then, to keep the $\sigma$-field "stable", we must add its complement. We add another event. We must then also add its complement, its intersection and union with the first set we added, and the intersections and unions of their complements. 

Now, think of adding a countably infinite number of sets, or an uncountable number. This may help us visualize how quickly the $\sigma$-field would need to expand to keep up with our notion of "stability". 

<strong>**</strong> <em>This thought experiment is just a naïve, illustrative example for what a $\sigma$-field may look like, it is not representative</em>.

We interpret a $\sigma$-field defined on a space&mdash;in the context of probability, this would be the <em>sample space</em>&mdash;to be the set of all subsets (events) that can be properly measured. We thus now introduce the notion of <em>measurable spaces</em>. The actual concept of "measuring" or "measurement" itself will be reserved for later, as it has a few more prerequisites that have yet to be introduced.



<div class="callout proposition"><span class="label">Proposition</span><br/>
prop text.
</div>

<div class="callout remark"><span class="label">Remark</span><br/>
remark text.
</div>

## π & λ Systems

yay

### Equation numbering template

default:
$$ \liminf_{n\to\infty} A_n \subseteq \limsup_{n\to\infty} A_n. $$

alphabetic:
$$ \bigcap_{n=m}^\infty A_n \subseteq \bigcup_{n=m}^\infty A_n \tag{(a)} $$

roman:
$$ (\limsup A_n)^c = \liminf (A_n^c) \tag{(i)} $$
