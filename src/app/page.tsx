export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="wrap topbar-in">
          <span className="dots"><i></i><i></i><i></i></span>
          <span className="title-bar">codeuach — <b>bash</b> — 120×40</span>
          <nav className="tabs">
            <a href="#idea">idea</a>
            <a href="#flujo">flujo</a>
            <a href="#alcance">alcance</a>
            <a href="#ranking">ranking</a>
          </nav>
          <a className="login" href="#idea">[ entrar con correo UACh ]</a>
        </div>
      </header>

      <main id="top">
        <div className="wrap hero">
          <div>
            <p className="prompt">whoami</p>
            <p className="out">taller de ingeniería · universidad austral de chile · valdivia</p>
            <h1 className="art">
              {"╔═╗╔═╗╔╦╗╔═╗╦ ╦╔═╗╔═╗╦ ╦\n" +
                "║  ║ ║ ║║║╣ ║ ║╠═╣║  ╠═╣\n" +
                "╚═╝╚═╝═╩╝╚═╝╚═╝╩ ╩╚═╝╩ ╩"}
            </h1>
            <p className="tagline">Juez automático de programación para los ramos de la Austral. El profesor publica los problemas, tú envías tu solución y el servidor responde en segundos si pasa <em>todos</em> los casos de prueba. Se entrena la lógica resolviendo, no copiando.<span className="cursor"></span></p>
            <div className="actions">
              <a className="btn btn--go" href="#flujo">./ver_flujo.sh</a>
              <a className="btn" href="#alcance">cat alcance.md</a>
            </div>
            <p className="disclaimer">{"// prototipo de curso. lo que ves son maquetas, todavía no hay un servidor corriendo."}</p>
          </div>

          <div className="panel">
            <span className="label">envio-1042.log</span>
            <div className="panel-pad">
              <dl className="kv">
                <dt>problema</dt><dd>B. Suma de dos números</dd>
                <dt>autor</dt><dd>Lasc19</dd>
                <dt>lenguaje</dt><dd>python 3.12</dd>
              </dl>
              <pre className="code">
                <span className="cm"># lee dos enteros y escribe su suma</span>{"\n"}
                {"a, b = "}
                <span className="fn">map</span>
                {"("}
                <span className="kw">int</span>
                {", "}
                <span className="fn">input</span>
                {"().split())\n"}
                <span className="fn">print</span>
                {"(a + b)"}
              </pre>
              <div className="tests">
                <div className="test"><span className="ok">[ok]</span><span>caso 1 · «2 3» → «5»</span><span className="ms">0,01 s</span></div>
                <div className="test"><span className="ok">[ok]</span><span>caso 2 · «-7 7» → «0»</span><span className="ms">0,01 s</span></div>
                <div className="test"><span className="ok">[ok]</span><span>caso 3 · límites</span><span className="ms">0,02 s</span></div>
                <div className="test"><span className="ok">[ok]</span><span>caso 4 · aleatorio</span><span className="ms">0,01 s</span></div>
              </div>
              <div className="verdict">
                <span className="badge badge--ac">ACEPTADO</span>
                <span>4/4 casos · 0,05 s · 11 MB</span>
              </div>
            </div>
          </div>
        </div>

        <section className="sec" id="idea">
          <div className="wrap">
            <div className="sec-head"><h2>01_la_idea</h2></div>
            <p className="sec-lede">Los estudiantes llegan cada vez menos motivados a programar. Cuando el ejercicio se resuelve pidiéndoselo a una IA, el enunciado se cumple pero el pensamiento lógico —que era lo que se estaba enseñando— no se ejercita. <b>CodeUACh apunta al lado contrario:</b> problemas que se resuelven razonando, corregidos al instante, con un puntaje que sube solo cuando de verdad aprendiste algo. Es una plataforma de uso exclusivo de la universidad, así que el profesor mantiene control total sobre el material, los ejercicios, los puntajes y el rendimiento del curso.</p>
            <div className="cols">
              <div className="item">
                <span className="tag">~/estudiante</span>
                <h3>Medir tu nivel y subirlo</h3>
                <p>Sabes en qué estás parado: qué temas dominas, cuáles te cuestan y cuánto avanzaste. Cada intento se corrige al instante, así que puedes pulirte por tu cuenta.</p>
              </div>
              <div className="item">
                <span className="tag">~/docente</span>
                <h3>Evaluar al curso sin corregir a mano</h3>
                <p>El profesor elige el material, publica los ejercicios y define los puntajes. Las 60 entregas se corrigen con la misma regla y el nivel de cada estudiante queda a la vista.</p>
              </div>
              <div className="item">
                <span className="tag">~/ramo</span>
                <h3>Ver dónde está floja la clase</h3>
                <p>El rendimiento por tema muestra qué áreas están críticas frente a las demás, para reforzar justo ahí en vez de adivinar.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="flujo">
          <div className="wrap">
            <div className="sec-head"><h2>02_como_funciona</h2></div>
            <p className="prompt pipeline">elegir_problema <span className="arg">|</span> enviar_solucion --lang=py <span className="arg">|</span> juez --run --tests=all</p>
            <div className="steps">
              <div className="step">
                <span className="n">[1/3]</span>
                <h3>Eliges un problema</h3>
                <p>Cada problema trae enunciado, formato de entrada y salida, un ejemplo resuelto y sus límites de tiempo y memoria.</p>
              </div>
              <div className="step">
                <span className="n">[2/3]</span>
                <h3>Envías tu solución</h3>
                <p>Pegas tu código en Python, C++ o Java. El envío queda guardado con tu cuenta institucional y la hora exacta.</p>
              </div>
              <div className="step">
                <span className="n">[3/3]</span>
                <h3>El juez responde</h3>
                <p>El servidor compila, ejecuta tu programa contra cada caso y devuelve el veredicto: aceptado, respuesta incorrecta o tiempo excedido.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="alcance">
          <div className="wrap">
            <div className="sec-head"><h2>03_alcance</h2></div>
            <p className="sec-lede">Preferimos poco y funcionando. Estos son los seis módulos mínimos para que un ramo pueda usar la plataforma de verdad; lo demás queda anotado para una segunda etapa.</p>
            <ul className="check">
              <li><span className="box">[x]</span><span className="txt"><b>cuentas</b> — ingreso con el correo institucional, dos roles: estudiante y docente.</span></li>
              <li><span className="box">[x]</span><span className="txt"><b>problemas</b> — listado con tema, dificultad y estado: resuelto, intentado o sin intentar.</span></li>
              <li><span className="box">[x]</span><span className="txt"><b>envíos</b> — editor simple, selección de lenguaje e historial de todos tus intentos.</span></li>
              <li><span className="box">[x]</span><span className="txt"><b>juez</b> — ejecución aislada con límite de tiempo y memoria, comparando con la salida esperada.</span></li>
              <li><span className="box">[x]</span><span className="txt"><b>ranking</b> — tabla por ramo según problemas resueltos y puntaje acumulado.</span></li>
              <li><span className="box">[x]</span><span className="txt"><b>panel docente</b> — crear problemas, definir puntajes y ver el rendimiento del curso por tema para detectar áreas críticas.</span></li>
              <li className="todo"><span className="box box--todo">[ ]</span><span className="txt"><b>concursos en vivo</b> — etapa 2</span></li>
              <li className="todo"><span className="box box--todo">[ ]</span><span className="txt"><b>editoriales y foro</b> — etapa 2</span></li>
              <li className="todo"><span className="box box--todo">[ ]</span><span className="txt"><b>detección de plagio</b> — etapa 2</span></li>
            </ul>
          </div>
        </section>

        <section className="sec" id="ranking">
          <div className="wrap">
            <div className="sec-head"><h2>04_ranking</h2></div>
            <p className="prompt" style={{ marginTop: "22px" }}>codeuach ranking <span className="arg">--ramo=INFO134 --top=5</span></p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>#</th><th>usuario</th><th>carrera</th>
                    <th className="num">resueltos</th><th className="num">puntaje</th><th>último envío</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="n">1</td><td className="user">Lasc19</td><td className="dim">Ing. Civil Informática</td><td className="num">14</td><td className="num">1820</td><td><span className="badge badge--ac">ACEPTADO</span></td></tr>
                  <tr><td className="n">2</td><td className="user">matias2005-20</td><td className="dim">Ing. Civil Informática</td><td className="num">12</td><td className="num">1640</td><td><span className="badge badge--ac">ACEPTADO</span></td></tr>
                  <tr><td className="n">3</td><td className="user">facs2005</td><td className="dim">Ing. Civil Electrónica</td><td className="num">11</td><td className="num">1585</td><td><span className="badge badge--tle">TIEMPO EXCEDIDO</span></td></tr>
                  <tr><td className="n">4</td><td className="user">SoulFast23</td><td className="dim">Ing. Civil Informática</td><td className="num">9</td><td className="num">1290</td><td><span className="badge badge--wa">INCORRECTO</span></td></tr>
                  <tr><td className="n">5</td><td className="user">jurjur45</td><td className="dim">Bioinformática</td><td className="num">8</td><td className="num">1155</td><td><span className="badge badge--ac">ACEPTADO</span></td></tr>
                </tbody>
              </table>
            </div>
            <p className="out" style={{ marginTop: "14px" }}>{"// datos de ejemplo para mostrar la pantalla"}</p>
          </div>
        </section>
      </main>

      <footer className="status">
        <div className="wrap status-in">
          <span className="mode">NORMAL</span>
          <span className="path">~/codeuach/idea.md</span>
          <span className="sep">│</span>
          <span>proyecto académico de estudiantes — no es un sitio oficial de la UACh</span>
          <span className="right">valdivia · 2026</span>
        </div>
      </footer>
    </>
  );
}
