---
theme: none
title: Teoría de grafos
author: Arturo Fernández
lang: es
aspectRatio: 16/9
canvasWidth: 980
colorSchema: light
transition: fade
download: false
remoteAssets: false
fonts:
  provider: none
class: cover
---

<img class="logo-colegio" src="./assets/portraits/images.jpg" alt="Logo del colegio" />

# Teoría de<br><span>grafos</span>

<img class="cover-network" src="./assets/cover-network.svg" alt="" />

<div class="cover-author">Arturo Fernández</div>



---

# Objetivo

<p class="objective-statement">Comprender los fundamentos de la teoría de grafos, sus formas de representación y sus principales aplicaciones en situaciones de la vida cotidiana.</p>

<ul class="objective-list">
  <li>
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <path d="M8 26 18 9 28 26Z" />
      <circle cx="8" cy="26" r="3" /><circle cx="18" cy="9" r="3" /><circle cx="28" cy="26" r="3" />
    </svg>
    Comprender qué es un grafo.
  </li>
  <li>
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <rect x="5" y="5" width="26" height="26" rx="3" /><path d="M5 14h26M5 22h26M14 5v26M22 5v26" />
    </svg>
    Aprender a interpretar sus representaciones.
  </li>
  <li>
    <svg viewBox="0 0 36 36" aria-hidden="true">
      <path d="M9 27h11a6 6 0 0 0 0-12h-2a5 5 0 0 1 0-10h9" />
      <circle cx="8" cy="27" r="3" /><circle cx="28" cy="5" r="3" />
    </svg>
    Reconocer sus aplicaciones prácticas.
  </li>
</ul>



---

# Relaciones en una red social

<RelationshipTable />

<p class="slide-note" id="table-note">Cada fila indica a quién sigue una persona. Cada columna representa a la persona que recibe esa conexión.</p>



---

# La misma información como grafo

<DirectedGraph />

<p class="slide-note">Los vértices representan a las personas y las aristas dirigidas indican quién sigue a quién.</p>



---
clicks: 6
class: history-slide
---

# Las mentes detrás de la teoría de grafos

<p class="slide-subtitle">De los puentes de Königsberg a las redes modernas.</p>

<HistoryTimeline :step="$clicks" />



---
class: graph-definition-slide
---

# ¿Qué es un grafo?

<p class="graph-definition">En Matemáticas y Ciencias de la computación se llama grafo al conjunto de vértices o nodos unidos por aristas o arcos que representan una relación entre los elementos de un conjunto.</p>

<div v-click.fade-in="1" class="graph-notation">

$$
G = (V, E)
$$

</div>

<p v-click.fade-in="2" class="graph-symbols">Llamamos <strong>V</strong> al conjunto de vértices y <strong>E</strong> al conjunto de aristas.</p>

---
class: graph-uses-slide
---

# ¿Dónde se utilizan los grafos?

<dl class="graph-uses">
  <div>
    <dt>Redes sociales</dt>
    <dd>Representar relaciones de amistad y seguimiento entre usuarios.</dd>
  </div>
  <div>
    <dt>Mapas y GPS</dt>
    <dd>Calcular rutas entre distintos lugares.</dd>
  </div>
  <div>
    <dt>Transporte público</dt>
    <dd>Representar conexiones entre estaciones y recorridos.</dd>
  </div>
  <div>
    <dt>Internet</dt>
    <dd>Estudiar las conexiones entre computadores y servidores.</dd>
  </div>
  <div>
    <dt>Biología y medicina</dt>
    <dd>Analizar interacciones entre proteínas y redes de propagación de enfermedades.</dd>
  </div>
  <div>
    <dt>Logística</dt>
    <dd>Optimizar rutas de entrega y distribución de productos.</dd>
  </div>
</dl>

---
class: lesson-slide
---

# Elementos de un grafo

<div class="lesson-split">
  <LessonGraph name="basics" :focus="$clicks === 0 ? ['A'] : $clicks === 2 ? ['A','B'] : $clicks === 3 ? ['C'] : []" :highlight="$clicks < 1 ? [] : $clicks === 3 ? ['AC','BC','CD'] : ['AB']" />
  <div class="lesson-copy concept-list">
    <p><strong>Vértice o nodo.</strong> Es un elemento del grafo. Por ejemplo, A.</p>
    <p v-click.fade-in="1"><strong>Arista.</strong> Es una conexión entre dos vértices, como la que une A con B.</p>
    <p v-click.fade-in="2"><strong>Adyacencia.</strong> A y B son adyacentes porque una arista los conecta.</p>
    <p v-click.fade-in="3"><strong>Grado.</strong> En un grafo simple no dirigido, cuenta las aristas que tocan el vértice. C tiene grado <strong>3</strong>.</p>
  </div>
</div>



---
class: lesson-slide
---

# Caminos, recorridos, ciclos y bucles

<div class="lesson-split">
  <LessonGraph name="basics" :added="$clicks === 3" :highlight="$clicks === 0 ? ['AB','BC','CD'] : $clicks === 2 ? ['AB','BC','AC'] : $clicks === 3 ? ['BB'] : []" :focus="$clicks === 1 ? ['A','C'] : $clicks === 2 ? ['A'] : $clicks === 3 ? ['B'] : []" />
  <div class="lesson-copy reveal-stack">
    <div class="lesson-step" v-show="$clicks === 0">
      <strong>Camino simple</strong>
      <p>Recorrido que no repite vértices.</p>
      <p class="circuit-route">A → B → C → D</p>
    </div>
    <div class="lesson-step" v-click.fade-in="[1, 2]">
      <strong>Recorrido no simple</strong>
      <p>Puede pasar más de una vez por un vértice. También se le llama camino compuesto.</p>
      <p class="circuit-route">A → B → C → A → C → D</p>
      <p>Se repiten A y C.</p>
    </div>
    <div class="lesson-step" v-click.fade-in="[2, 3]">
      <strong>Ciclo</strong>
      <p>Recorrido cerrado que vuelve al vértice inicial sin repetir los demás.</p>
      <p class="circuit-route">A → B → C → A</p>
    </div>
    <div class="lesson-step" v-click.fade-in="3">
      <strong>Bucle o lazo</strong>
      <p>Es una arista que conecta un vértice consigo mismo. En el dibujo, sale de B y vuelve a B.</p>
    </div>
  </div>
</div>

<p class="lesson-foot">Las flechas escritas indican el orden del recorrido. Las aristas del dibujo son no dirigidas.</p>



---
class: lesson-slide
---

# Grafo dirigido (dígrafo)

<div class="lesson-split">
  <LessonGraph name="digraph" :focus="['B']" />
  <div class="lesson-copy concept-list">
    <p class="lesson-lead">Un dígrafo es un grafo cuyas aristas tienen una dirección determinada. Estas conexiones se representan mediante flechas.</p>
    <p class="lesson-aside">A → B no implica que exista B → A.</p>
    <p><strong>Grado de entrada.</strong> Cantidad de flechas que llegan a un vértice.</p>
    <p><strong>Grado de salida.</strong> Cantidad de flechas que salen de un vértice.</p>
  </div>
</div>



---
class: lesson-slide
---

# Ejercicio 1 — Grafos dirigidos

<div class="lesson-split">
  <LessonGraph name="digraph" :focus="$clicks === 3 ? ['D','A'] : ['B']" :highlight="$clicks === 1 ? ['AB','CB'] : $clicks === 2 ? ['BD'] : $clicks === 3 ? ['DA'] : []" />
  <div class="lesson-copy">
    <p class="lesson-lead">Observa el grafo y responde.</p>
    <ol class="lesson-questions">
      <li>¿Cuántas flechas llegan a B?<p class="lesson-answer" v-click.fade-in="1">Grado de entrada de B = 2.</p></li>
      <li>¿Cuántas flechas salen de B?<p class="lesson-answer" v-click.fade-in="2">Grado de salida de B = 1.</p></li>
      <li>¿Existe una conexión directa de D a A?<p class="lesson-answer" v-click.fade-in="3">Sí, existe una conexión directa desde D hacia A.</p></li>
    </ol>
  </div>
</div>



---
class: lesson-slide circuit-slide
---

# Caminos y circuitos eulerianos

<p class="lesson-lead"><strong>Camino euleriano.</strong> Usa todas las aristas del grafo exactamente una vez. Puede repetir vértices.</p>
<p class="circuit-intro" v-click.fade-in="1"><strong>Circuito euleriano.</strong> Es un camino euleriano que termina donde empezó.</p>

<div class="lesson-split" v-click.fade-in="2">
  <LessonGraph :name="$clicks === 2 ? 'eulerSquare' : $clicks === 3 ? 'eulerOpen' : 'eulerStar'" :route="$clicks === 2 ? ['A','B','C','D','A'] : $clicks === 3 ? ['E','A','B','C','D','A'] : []" :focus="$clicks === 3 ? ['A','E'] : $clicks === 4 ? ['A','B','C','D'] : []" />
  <div class="lesson-copy">
    <p class="lesson-foot">En un grafo no dirigido y conexo, cuenta los vértices de grado impar.</p>
    <div class="reveal-stack">
      <div v-show="$clicks === 2" class="lesson-step blue-step">
        <strong>0 impares · Existe un circuito</strong>
        <p>Los cuatro vértices tienen grado 2.</p>
        <p class="circuit-route">A → B → C → D → A</p>
      </div>
      <div v-click.fade-in="[3, 4]" class="lesson-step">
        <strong>2 impares · Existe un camino abierto</strong>
        <p>A tiene grado 3 y E tiene grado 1. El camino empieza en uno y termina en el otro. No hay circuito euleriano.</p>
        <p class="circuit-route">E → A → B → C → D → A</p>
      </div>
      <div v-click.fade-in="4" class="lesson-step">
        <strong>Más de 2 impares · No existe camino euleriano</strong>
        <p>En esta estrella, los cuatro grados son 3, 1, 1 y 1.</p>
      </div>
    </div>
    <p class="lesson-foot">El número de vértices de grado impar siempre es par.</p>
  </div>
</div>



---
class: lesson-slide circuit-slide
---

# ¿Y si las aristas tienen dirección?

<p class="lesson-lead">Un circuito euleriano usa cada arco exactamente una vez, respeta su dirección y vuelve al vértice inicial.</p>

<div class="lesson-split">
  <LessonGraph name="eulerDirected" :route="$clicks >= 3 ? ['A','B','C','A','D','A'] : []" />
  <div class="lesson-copy compact-copy">
    <div v-click.fade-in="1" class="circuit-degree" :data-balanced="$clicks >= 2">
      <table class="lesson-matrix" aria-label="Grados de entrada y salida">
        <thead><tr><th scope="col">Vértice</th><th scope="col">Entrada</th><th scope="col">Salida</th></tr></thead>
        <tbody>
          <tr><th scope="row">A</th><td>2</td><td>2</td></tr>
          <tr><th scope="row">B</th><td>1</td><td>1</td></tr>
          <tr><th scope="row">C</th><td>1</td><td>1</td></tr>
          <tr><th scope="row">D</th><td>1</td><td>1</td></tr>
        </tbody>
      </table>
      <p class="lesson-foot">Entrada: arcos que llegan. Salida: arcos que salen.</p>
    </div>
<div v-click.fade-in="2">

Si todos los arcos están en una misma componente al ignorar el sentido, existe un circuito si y solo si cada vértice cumple $\deg^-(v)=\deg^+(v)$.

</div>
<p class="circuit-route" v-click.fade-in="3">A → B → C → A → D → A</p>
<p class="lesson-answer" v-click.fade-in="4">Todos los vértices cumplen la igualdad. Existe un circuito euleriano.</p>
</div>
</div>



---
class: lesson-slide circuit-slide
---

# Circuito hamiltoniano

<div class="lesson-split">
  <LessonGraph name="plane" :route="$clicks === 2 ? ['A','B','C','D'] : $clicks >= 3 ? ['A','B','C','D','A'] : []" :focus="$clicks >= 3 ? ['A'] : []" visit />
  <div class="lesson-copy">
    <p v-click.fade-in="1">Un circuito hamiltoniano es un ciclo que visita todos los vértices una vez y vuelve al inicial. Solo se repite el vértice de partida para cerrar el ciclo.</p>
    <div class="reveal-stack">
      <p class="circuit-route" v-click.fade-in="[2, 3]">A → B → C → D</p>
      <p class="circuit-route" v-click.fade-in="3">A → B → C → D → A</p>
    </div>
    <p class="lesson-aside" v-click.fade-in="4">La diagonal A–C queda sin usar. El circuito ya visitó todos los vértices.</p>
    <p class="lesson-foot" v-click.fade-in="4"><strong>Euler:</strong> recorre todas las aristas.<br><strong>Hamilton:</strong> visita todos los vértices.<br>Un grafo puede tener ambos circuitos.</p>
  </div>
</div>



---
class: lesson-slide circuit-slide dirac-slide
---

# Teorema de Dirac

<p class="lesson-lead">¿Cómo podemos garantizar que existe un circuito hamiltoniano?</p>

<div class="dirac-theorem">

En un grafo simple no dirigido con $n \geq 3$ vértices, si $\delta(G) \geq n/2$, existe un circuito hamiltoniano. $\delta(G)$ es el grado mínimo.

</div>
<div class="lesson-split">
  <div v-click.fade-in="1">
    <LessonGraph name="dirac" :reduced="$clicks >= 4" :route="$clicks >= 3 ? ['A','B','C','D','E','F','A'] : []" />
  </div>
  <div class="lesson-copy compact-copy">
    <div class="reveal-stack">
      <div class="lesson-step blue-step" v-click.fade-in="[2, 4]">
        <strong>Seis vértices de grado 3</strong>
        <p>n = 6 y δ(G) = 3. Como 3 ≥ 6/2, Dirac garantiza el circuito.</p>
      </div>
      <div class="lesson-step" v-click.fade-in="[4, 5]">
        <strong>Quitamos tres aristas</strong>
        <p>Desaparecen A–D, B–E y C–F.</p>
      </div>
      <div class="lesson-step" v-click.fade-in="5">
        <strong>Queda un ciclo de seis vértices</strong>
        <p>δ(G) = 2 &lt; 3. La condición falla y el circuito sigue existiendo.</p>
      </div>
    </div>
    <p class="circuit-route" v-click.fade-in="3">A → B → C → D → E → F → A</p>
    <div class="lesson-aside" v-click.fade-in="6">
      <strong>Dirac es una condición suficiente y no necesaria.</strong>
      <p>Si se cumple, hay un circuito. Si falla, todavía puede haberlo.</p>
    </div>
  </div>
</div>



---
class: lesson-slide circuit-slide dense-title
---

# Ejercicio — ¿Euleriano, hamiltoniano o ambos?

<div class="lesson-split">
  <LessonGraph name="doubleTriangle" :route="$clicks === 2 ? ['C','A','B','C','D','E','C'] : []" :focus="$clicks === 3 ? ['C'] : []" :highlight="$clicks === 3 ? ['AB','BC','CA'] : []" :secondary="$clicks === 3 ? ['CD','DE','EC'] : []" />
  <div class="lesson-copy compact-copy">
    <ol class="lesson-questions">
      <li>¿Existe un circuito euleriano?</li>
      <li>¿Existe un circuito hamiltoniano?</li>
      <li>¿Se cumple la condición de Dirac?</li>
    </ol>
    <div class="reveal-stack">
      <div class="lesson-step" v-click.fade-in="[1, 2]">
        <strong>Grados en orden A, B, C, D, E</strong>
        <p>2, 2, 4, 2, 2. Todos son pares.</p>
      </div>
      <div class="lesson-step blue-step" v-click.fade-in="[2, 3]">
        <strong>Sí hay circuito euleriano.</strong>
        <p>El grafo es conexo y todos sus grados son pares. El circuito utiliza sus seis aristas una vez.</p>
        <p class="circuit-route">C → A → B → C → D → E → C</p>
      </div>
      <div class="lesson-step" v-click.fade-in="[3, 4]">
        <strong>No hay circuito hamiltoniano.</strong>
        <p>Los dos triángulos solo se unen en C. Un recorrido cerrado que visite ambos repetiría C antes de terminar.</p>
      </div>
      <div class="lesson-step" v-click.fade-in="4">
        <strong>No cumple Dirac.</strong>
        <p>n = 5 y δ(G) = 2 &lt; 2,5. Eso no descarta un circuito: aquí lo descarta el vértice de articulación C.</p>
      </div>
    </div>
    <p class="lesson-answer" v-click.fade-in="5">Un grafo puede ser euleriano sin ser hamiltoniano.</p>
  </div>
</div>



---
class: lesson-slide
---

# Grafo plano

<p class="lesson-lead">Un grafo es planar si puede dibujarse en un plano sin que sus aristas se crucen, excepto en los vértices donde se conectan.</p>

<div class="lesson-split">
  <LessonGraph name="plane" faces />
  <div class="lesson-copy">
    <p><strong>Caras.</strong> El dibujo separa el plano en dos regiones interiores y una región exterior.</p>
<div class="lesson-math" aria-label="Fórmula de Euler">

$$
V - E + F = 2
$$

</div>
<p><strong>V</strong> cuenta vértices, <strong>E</strong> aristas y <strong>F</strong> caras, incluida la exterior.</p>
<p class="lesson-aside"><strong>4 − 5 + 3 = 2</strong> en este dibujo conexo.</p>
</div>
</div>



---
class: lesson-slide
---

# Ejercicio 2 — Grafos planos

<p class="lesson-lead">¿Puede dibujarse este grafo sin que sus aristas se crucen?</p>

<div class="lesson-split">
  <LessonGraph name="complete" :alternate="$clicks >= 2" :focus="$clicks === 2 ? ['D'] : []" />
  <div class="lesson-copy">
    <p class="lesson-foot">Un cruce de líneas no añade un vértice.</p>
    <p class="lesson-aside" v-click.fade-in="1">¿Podemos cambiar la posición de los vértices sin eliminar ninguna arista?</p>
    <p v-click.fade-in="2">Desplazamos D al interior del triángulo ABC. Se conservan las seis aristas.</p>
    <div class="lesson-step" v-click.fade-in="3">
      <strong>Sí, K₄ es planar.</strong>
      <p>Este dibujo no tiene cruces. Hay cuatro caras, incluida la exterior.</p>
      <p class="lesson-answer">4 − 6 + 4 = 2.</p>
    </div>
  </div>
</div>



---
class: lesson-slide
---

# Grafo ponderado

<div class="lesson-split">
  <div>
    <LessonGraph name="weighted" :highlight="['AB']" />
    <p class="lesson-foot diagram-caption">Los pesos representan minutos de viaje.</p>
  </div>
  <div class="lesson-copy">
    <p class="lesson-lead">Un grafo ponderado es aquel cuyas aristas tienen asociado un valor numérico, llamado peso.</p>
    <p>Un peso puede representar <strong>distancia</strong>, <strong>tiempo</strong> o <strong>costo</strong>.</p>
    <p class="lesson-aside">La arista A–B representa un viaje directo de <strong>5 minutos</strong>.</p>
  </div>
</div>



---
class: lesson-slide
---

# Ejercicio 3 — Grafos ponderados

<p class="lesson-lead">¿Cuál es la ruta de A hasta D que demora menos? Calcula el tiempo total de cada ruta.</p>

<div class="lesson-split">
  <div>
    <LessonGraph name="weighted" :highlight="$clicks === 1 ? ['AB','BD'] : $clicks === 2 ? ['AC','CD'] : $clicks >= 3 ? ['AC','BC','BD'] : []" :color="$clicks >= 3 ? 'blue' : 'amber'" />
    <p class="lesson-foot diagram-caption">Cada arista se puede recorrer en ambos sentidos.</p>
  </div>
  <div class="lesson-copy">
    <div class="lesson-step" v-click.fade-in="1"><strong>A → B → D</strong><p>5 + 3 = 8 minutos.</p></div>
    <div class="lesson-step" v-click.fade-in="2"><strong>A → C → D</strong><p>2 + 8 = 10 minutos.</p></div>
    <div class="lesson-step blue-step" v-click.fade-in="3"><strong>A → C → B → D</strong><p>2 + 1 + 3 = 6 minutos.</p></div>
    <p class="lesson-answer" v-click.fade-in="4">La ruta más rápida es A → C → B → D y tarda 6 minutos.</p>
  </div>
</div>



---
class: lesson-slide
---

# Árbol (grafo conexo y acíclico)

<p class="lesson-lead">Un árbol es un grafo no dirigido que está conectado y no contiene ciclos.</p>

<div class="lesson-split">
  <div>
    <LessonGraph name="tree" />
    <p class="lesson-foot diagram-caption">6 vértices y 5 aristas</p>
  </div>
  <div class="lesson-copy">
    <p><strong>Conexo.</strong> Hay un camino entre cualquier par de vértices.</p>
    <p><strong>Acíclico.</strong> No contiene ciclos. Entre dos vértices existe un único camino simple.</p>
<div class="lesson-math">

$$
|E| = |V| - 1
$$

</div>
<p class="lesson-aside">Un grafo no dirigido sin ciclos y desconectado es un <strong>bosque</strong>.</p>
</div>
</div>



---
class: lesson-slide
---

# Ejercicio 4 — Árboles

<p class="lesson-lead">¿Qué ocurriría si agregamos una conexión entre D y E?</p>

<div class="lesson-split">
  <LessonGraph name="tree" :added="$clicks >= 1" :highlight="$clicks === 1 ? ['DE'] : $clicks >= 2 ? ['BD','BE','DE'] : []" />
  <div class="lesson-copy">
    <p class="lesson-aside" v-click.fade-in="1">Agregamos la arista D–E.</p>
    <div class="lesson-step" v-click.fade-in="2">
      <strong>D → B → E → D</strong>
      <p>Al agregar esta conexión aparece un ciclo.</p>
    </div>
    <div class="lesson-step blue-step" v-click.fade-in="3">
      <strong>El grafo deja de ser un árbol porque ya no es acíclico.</strong>
      <p>Antes: 6 vértices, 5 aristas.<br>Después: 6 vértices, 6 aristas.</p>
      <p class="lesson-foot">En un grafo no dirigido conexo, tener una arista menos que vértices caracteriza a los árboles.</p>
    </div>
  </div>
</div>



---
class: lesson-slide
---

# Matrices de adyacencia

<p class="lesson-lead">Una matriz de adyacencia es una tabla cuadrada que permite representar las conexiones entre los vértices de un grafo.</p>

<div class="lesson-split matrix-split social-matrices">
  <div>
    <h2>Tabla original</h2>
    <LessonMatrix kind="social" :highlight="$clicks >= 1 ? ['Rodrigo:Cho'] : []" />
  </div>
  <div class="social-result">
    <div class="social-conversion" v-click.fade-in="[2, 3]">
      <p><span>Sí</span><span aria-hidden="true">→</span><strong>1</strong></p>
      <p><span>No</span><span aria-hidden="true">→</span><strong>0</strong></p>
    </div>
    <div v-click.fade-in="3">
      <h2>Matriz de adyacencia</h2>
      <LessonMatrix kind="socialNumbers" :highlight="['Rodrigo:Cho']" />
    </div>
  </div>
</div>

<p class="lesson-foot" v-click.fade-in="2"><strong>Sí = 1 · No = 0.</strong> El «Sí» de Rodrigo a Cho pasa a ser un 1.</p>
<p class="lesson-foot" v-click.fade-in="3">La fila es el origen y la columna es el destino. La diagonal contiene ceros porque nadie se sigue a sí mismo.</p>



---
class: lesson-slide
---

# Matrices según la dirección de las aristas

<div class="lesson-split matrix-split comparison-matrices">
  <div>
    <h2>Grafo no dirigido</h2>
    <LessonGraph name="chain" :highlight="$clicks >= 1 ? ['AB','BC'] : []" />
    <div v-click.fade-in="1">
      <LessonMatrix kind="chain" :highlight="['AB','BC']" />
      <p class="lesson-foot">La matriz es simétrica. Cada conexión funciona en ambos sentidos.</p>
    </div>
  </div>
  <div>
    <h2>Dígrafo</h2>
    <LessonGraph name="directedChain" :highlight="$clicks >= 2 ? ['AB','BC'] : []" />
    <div v-click.fade-in="2">
      <LessonMatrix kind="directedChain" :highlight="['AB','BC']" />
      <p class="lesson-foot">La matriz puede ser asimétrica. La dirección de la conexión importa.</p>
    </div>
  </div>
</div>



---
class: lesson-slide
---

# Matrices de grafos ponderados

<p class="lesson-lead">En una matriz de pesos escribimos el valor asociado a cada conexión directa.</p>

<div class="lesson-split matrix-split weighted-matrix">
  <LessonGraph name="weighted" :highlight="$clicks === 1 ? ['AB'] : $clicks >= 2 ? ['BC'] : []" />
  <div>
    <LessonMatrix kind="weighted" :highlight="$clicks === 1 ? ['AB'] : $clicks >= 2 ? ['BC'] : []" />
    <p class="lesson-foot">Un número es el peso de una arista. «—» indica que no hay arista directa. Usamos «—» en la diagonal porque no hay bucles. Una arista de peso cero se escribiría como 0.</p>
    <div class="matrix-pair">
      <p class="lesson-foot" v-click.fade-in="[1, 2]"><strong>A–B:</strong> las dos celdas valen 5.</p>
      <p class="lesson-foot" v-click.fade-in="2"><strong>B–C:</strong> las dos celdas valen 1.</p>
    </div>
  </div>
</div>

<p class="lesson-foot">Los grafos planos y los árboles también se representan con matrices de adyacencia.</p>



---
class: lesson-slide lesson-problem
---

# Problema 1 — La ruta más rápida

<p class="lesson-lead">Una empresa de repartos necesita enviar un paquete desde A hasta E. Las calles son de un solo sentido y cada conexión indica el tiempo necesario para recorrerla.</p>

<div class="lesson-split">
  <LessonGraph name="delivery" :highlight="$clicks === 2 ? ['AB','BD','DE'] : $clicks >= 3 ? ['AC','CB','BD','DE'] : []" :secondary="$clicks === 2 ? ['AC','CD'] : []" :color="$clicks >= 3 ? 'blue' : 'amber'" />
  <div class="lesson-copy">
    <ol class="lesson-questions">
      <li>¿Qué tipos de grafo se utilizan?<p class="lesson-answer" v-click.fade-in="1">Dirigido y ponderado a la vez.</p></li>
      <li>¿Cuál es la ruta más rápida de A a E?
        <div class="route-candidates" v-click.fade-in="2">
          <p class="route-amber">A → B → D → E · 4 + 3 + 2 = 9 min</p>
          <p class="route-blue">A → C → D → E · 2 + 7 + 2 = 11 min</p>
        </div>
      </li>
      <li>¿Cuántos minutos demora?<p class="lesson-answer" v-click.fade-in="3">A → C → B → D → E · 2 + 1 + 3 + 2 = 8 min.</p></li>
    </ol>
    <p class="lesson-aside" v-click.fade-in="4">La ruta más rápida tarda <strong>8 minutos</strong> y respeta la dirección de todas las conexiones.</p>
  </div>
</div>



---
class: lesson-slide lesson-problem network-problem dense-title
---

# Problema 2 — Analizando una red mediante matrices

<p class="lesson-lead">Un colegio tiene seis computadores conectados mediante una red. Analicemos sus conexiones y cómo reorganizarlas para formar un árbol.</p>

<div class="lesson-split">
  <LessonGraph name="school" :reduced="$clicks >= 4" :highlight="$clicks === 2 ? ['AB'] : $clicks === 3 ? ['AB','AC','BC'] : $clicks >= 4 ? ['AB','AC','BD','CE','EF'] : []" :secondary="$clicks === 3 ? ['DE','DF','EF'] : []" :color="$clicks >= 4 ? 'blue' : 'amber'" />
  <div class="network-panel reveal-stack">
    <div v-show="$clicks === 0" class="lesson-copy">
      <ol class="lesson-questions">
        <li>Construye la matriz de adyacencia.</li>
        <li>Usa la matriz para contar las aristas.</li>
        <li>¿Es un árbol? Justifica.</li>
        <li>¿Cuántas aristas hay que quitar como mínimo para obtener un árbol sin desconectar la red?</li>
        <li>¿Cómo cambia la matriz tras quitarlas?</li>
      </ol>
    </div>
    <div v-click.fade-in="1" class="network-solution">
      <h2>{{ $clicks === 5 ? 'Matriz resultante' : 'Matriz original' }}</h2>
      <LessonMatrix kind="school" :reduced="$clicks === 5" :highlight="$clicks === 2 ? ['AB'] : []" />
      <div class="reveal-stack network-explanations">
        <p v-show="$clicks === 1">La matriz es simétrica. Cada conexión funciona en ambos sentidos.</p>
        <p v-click.fade-in="[2, 3]">La suma es 16. Cada arista cuenta dos veces, como A–B en las dos celdas destacadas. <strong>|E| = 16/2 = 8.</strong></p>
        <p v-click.fade-in="[3, 4]">No es un árbol. Contiene los ciclos <strong>A → B → C → A</strong> y <strong>D → E → F → D</strong>.</p>
        <p v-click.fade-in="[4, 5]">Un árbol de seis vértices tiene cinco aristas. Quitamos <strong>8 − 5 = 3</strong>: B–C, D–E y D–F. La red sigue conectada y sin ciclos. Hay otras soluciones.</p>
        <p v-click.fade-in="5">Las seis celdas en ámbar pasaron de <strong>1 a 0</strong>. Cada arista eliminada cambia dos celdas simétricas.</p>
      </div>
    </div>
  </div>
</div>



---
class: lesson-closing
---

# Conclusión

<p class="closing-lead">La teoría de grafos permite representar y analizar relaciones, conexiones y recorridos mediante estructuras matemáticas.</p>

<ul class="closing-points">
  <li>Los vértices representan elementos y las aristas representan conexiones.</li>
  <li>Los grafos pueden tener dirección, pesos y distintas propiedades estructurales.</li>
  <li>Las matrices permiten expresar esas conexiones de forma matemática.</li>
</ul>

<p class="closing-question">¿Qué otras situaciones de nuestra vida cotidiana podrían representarse mediante grafos?</p>

<img class="closing-network" src="./assets/cover-network.svg" alt="" />


