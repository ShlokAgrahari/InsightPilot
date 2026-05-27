import {
  BrainCircuit,
  FileText,
  Globe,
  ShieldCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";

import {
  Link
} from "react-router-dom";

const LandingPage = () => {

  const features = [

    {
      icon: <BrainCircuit size={24} />,
      title: "Multi-Agent Intelligence",
      desc:
      "Autonomous AI agents coordinate retrieval, reasoning, validation, and reflection workflows."
    },

    {
      icon: <Globe size={24} />,
      title: "Hybrid Web + RAG Search",
      desc:
      "Combine document retrieval with live internet intelligence for grounded responses."
    },

    {
      icon: <ShieldCheck size={24} />,
      title: "Citation Validation",
      desc:
      "AI-generated answers are verified using contextual citations and reflection loops."
    },

    {
      icon: <Sparkles size={24} />,
      title: "Enterprise AI Workflow",
      desc:
      "Built with LangGraph orchestration, vector search, reranking, and memory systems."
    }
  ];

  return (

    <div className="
    min-h-screen
    bg-slate-950
    text-white
    overflow-hidden
    ">

      {/* BACKGROUND GLOW */}
      <div className="
      absolute
      top-0
      left-1/2
      -translate-x-1/2
      w-[700px]
      h-[700px]
      bg-cyan-500/10
      blur-[140px]
      rounded-full
      pointer-events-none
      ">

      </div>


      {/* NAVBAR */}
      <nav className="
      relative
      z-10
      flex
      items-center
      justify-between
      px-10
      py-6
      border-b
      border-slate-800
      ">

        <div>

          <h1 className="
          text-2xl
          font-bold
          tracking-tight
          ">

            InsightPilot

          </h1>

          <p className="
          text-sm
          text-slate-400
          ">

            AI Document Intelligence

          </p>

        </div>

        <div className="
        flex
        items-center
        gap-4
        ">

          <Link

            to="/login"

            className="
            px-5
            py-2.5
            rounded-xl
            border
            border-slate-700
            hover:bg-slate-900
            transition
            "
          >

            Login

          </Link>

          <Link

            to="/signup"

            className="
            px-5
            py-2.5
            rounded-xl
            bg-gradient-to-r
            from-blue-600
            to-cyan-600
            hover:from-blue-700
            hover:to-cyan-700
            transition
            shadow-lg
            shadow-cyan-500/20
            "
          >

            Get Started

          </Link>

        </div>

      </nav>


      {/* HERO */}
      <section className="
      relative
      z-10
      px-10
      pt-24
      pb-20
      ">

        <div className="
        max-w-6xl
        mx-auto
        grid
        lg:grid-cols-2
        gap-16
        items-center
        ">

          {/* LEFT */}
          <div>

            <div className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-slate-900
            border
            border-slate-800
            text-cyan-400
            text-sm
            mb-6
            ">

              <Sparkles size={16} />

              Enterprise AI Platform

            </div>

            <h1 className="
            text-5xl
            md:text-6xl
            font-bold
            leading-tight
            tracking-tight
            ">

              Multi-Agent AI

              <span className="
              block
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              bg-clip-text
              text-transparent
              ">

                Document Intelligence

              </span>

            </h1>

            <p className="
            mt-8
            text-lg
            text-slate-400
            leading-8
            max-w-2xl
            ">

              Upload PDFs, retrieve
              intelligent insights,
              augment responses with
              real-time web intelligence,
              and interact with autonomous
              AI agents powered by
              advanced orchestration systems.

            </p>

            <div className="
            mt-10
            flex
            items-center
            gap-5
            ">

              <Link

                to="/signup"

                className="
                inline-flex
                items-center
                gap-2
                px-7
                py-4
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-600
                hover:from-blue-700
                hover:to-cyan-700
                transition
                shadow-xl
                shadow-cyan-500/20
                font-medium
                "
              >

                Launch Platform

                <ArrowRight size={18} />

              </Link>

              <Link

                to="/login"

                className="
                px-7
                py-4
                rounded-2xl
                border
                border-slate-700
                hover:bg-slate-900
                transition
                "
              >

                Login

              </Link>

            </div>

          </div>


          {/* RIGHT */}
          <div className="
          relative
          ">

            <div className="
            bg-slate-900/70
            backdrop-blur-xl
            border
            border-slate-800
            rounded-3xl
            p-8
            shadow-2xl
            shadow-cyan-500/10
            ">

              <div className="
              flex
              items-center
              justify-between
              mb-6
              ">

                <div>

                  <h3 className="
                  text-xl
                  font-semibold
                  ">

                    AI Execution Flow

                  </h3>

                  <p className="
                  text-slate-400
                  text-sm
                  mt-1
                  ">

                    Autonomous orchestration pipeline

                  </p>

                </div>

                <div className="
                h-3
                w-3
                rounded-full
                bg-green-500
                animate-pulse
                ">

                </div>

              </div>

              <div className="
              space-y-4
              ">

                {
                  [
                    "Supervisor Agent",
                    "Retrieval Engine",
                    "Web Intelligence",
                    "Reflection System",
                    "Citation Validator"
                  ].map((item) => (

                    <div

                      key={item}

                      className="
                      flex
                      items-center
                      justify-between
                      bg-slate-800/80
                      rounded-2xl
                      px-5
                      py-4
                      border
                      border-slate-700
                      "
                    >

                      <div className="
                      flex
                      items-center
                      gap-3
                      ">

                        <div className="
                        h-3
                        w-3
                        rounded-full
                        bg-cyan-400
                        ">

                        </div>

                        <span className="
                        text-slate-200
                        ">

                          {item}

                        </span>

                      </div>

                      <span className="
                      text-green-400
                      text-sm
                      ">

                        Active

                      </span>

                    </div>
                  ))
                }

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="
      relative
      z-10
      px-10
      pb-24
      ">

        <div className="
        max-w-6xl
        mx-auto
        ">

          <div className="
          text-center
          mb-14
          ">

            <h2 className="
            text-4xl
            font-bold
            ">

              Enterprise AI Architecture

            </h2>

            <p className="
            text-slate-400
            mt-4
            text-lg
            ">

              Built with modern agentic AI systems,
              vector intelligence, and orchestration pipelines.

            </p>

          </div>

          <div className="
          grid
          md:grid-cols-2
          gap-6
          ">

            {
              features.map((feature) => (

                <div

                  key={feature.title}

                  className="
                  bg-slate-900
                  border
                  border-slate-800
                  rounded-3xl
                  p-7
                  hover:border-cyan-500/40
                  transition
                  "
                >

                  <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-600
                  flex
                  items-center
                  justify-center
                  mb-5
                  shadow-lg
                  shadow-cyan-500/20
                  ">

                    {feature.icon}

                  </div>

                  <h3 className="
                  text-xl
                  font-semibold
                  mb-3
                  ">

                    {feature.title}

                  </h3>

                  <p className="
                  text-slate-400
                  leading-7
                  ">

                    {feature.desc}

                  </p>

                </div>
              ))
            }

          </div>

        </div>

      </section>

    </div>
  );
};

export default LandingPage;