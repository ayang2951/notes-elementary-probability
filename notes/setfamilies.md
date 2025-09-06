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

$$ \mathcal F_0 = \{A: |A| < \infty \text{ or } |A^c| < \infty\}, $$

i.e. the sets that are finite or co-finite. We show that this set is a field but not a $\sigma$-field.

We first verify that this is a field.
<ol type="i">
    <li>$\Omega^c = \varnothing$ has cardinality 0, clearly finite, so $\Omega$ is co-finite.</li>
    <li>Let $A \in \mathcal F_0$. Then either $|A| < \infty$ or $|A^c| < \infty$. Then, clearly, $A^c \in \mathcal F_0$.</li>
    <li>Suppose $A_1, A_2\in \mathcal F_0$. Suppose first that $|A_1|, |A_2| < \infty$. Then $|A_1 \cup A_2| < \infty$, so $A_1 \cup A_2 \in \mathcal F_0$. Now suppose that at least one of the sets is co-finite---without loss of generality, suppose it is $A_1$. Then $(A_1 \cup A_2)^c \subseteq A_1^c$, so $|(A_1 \cup A_2)^c| \leq |A_1^c| < \infty$, so $A_1 \cup A_2$ must be co-finite.</li>
</ol>
Now we show that $\mathcal F_0$ is not a $\sigma$-field. Consider a countably infinite number of distinct <i>singletons</i>&mdash;sets containing only one element each from the space&mdash;whose union is also countably infinite, e.g. the set of even numbers. This set is itself not finite, but it is also not co-finite: its complement, the set of odd numbers, is also countably infinite.

Thus, the family of finite and co-finite subsets of the natural numbers is a field, but not a $\sigma$-field.

We note that, for different spaces $\Omega$, this still holds. We used the set of natural numbers for simplicity and concreteness.
</div>

<div class="callout proposition"><span class="label">Proposition</span><br/>
Fields are closed under finite unions and intersections.
</div>

<details class="collapsible">
  <summary>Proof</summary>
  <div class="collapsible__content">
    proof.

  </div>
</details>

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
