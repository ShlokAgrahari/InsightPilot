import {
  Send,
  Loader2,
  Bot,
  User
} from "lucide-react";

import {
  useState
} from "react";

import api from
"../services/api";

import toast from
"react-hot-toast";

const ChatSection = ({
  setAgentLogs
}) => {

  const [query,
  setQuery] =
  useState("");

  const [loading,
  setLoading] =
  useState(false);

  const [messages,
  setMessages] =
  useState([]);


  // SEND MESSAGE
  const handleAsk =
  async () => {

    if (!query.trim()) return;

    const userMessage = {

      role: "user",

      content: query
    };

    // ADD USER MESSAGE
    setMessages((prev) => [

      ...prev,

      userMessage
    ]);

    try {

      setLoading(true);

      const res =
      await api.post(

        "/chat",

        {
          query
        }
      );

      console.log(res.data);

      // UPDATE AGENT STATUS
      setAgentLogs(
        res.data.agentLogs || []
      );

      const botMessage = {

        role: "assistant",

        content:
        res.data.answer,

        citations:
        res.data.citations || []
      };

      // ADD AI RESPONSE
      setMessages((prev) => [

        ...prev,

        botMessage
      ]);

      setQuery("");

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message
        || "Failed to get response"
      );

    } finally {

      setLoading(false);
    }
  };


  // ENTER KEY
  const handleKeyDown =
  (e) => {

    if (
      e.key === "Enter"
      && !loading
    ) {

      handleAsk();
    }
  };


  return (

    <div className="
    flex-1
    flex
    flex-col
    bg-[#020617]
    ">

      {/* CHAT AREA */}
      <div className="
      flex-1
      overflow-y-auto
      p-8
      ">

        <div className="
        max-w-4xl
        mx-auto
        space-y-6
        ">

          {
            messages.length === 0 && (

              <div className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-8
              text-center
              ">

                <div className="
                w-16
                h-16
                rounded-2xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-500
                flex
                items-center
                justify-center
                mx-auto
                mb-5
                ">

                  <Bot size={28} />

                </div>

                <h2 className="
                text-2xl
                font-bold
                text-white
                mb-3
                ">
                  InsightPilot AI
                </h2>

                <p className="
                text-slate-400
                leading-7
                max-w-2xl
                mx-auto
                ">

                  Upload PDFs and ask
                  questions using
                  AI-powered document
                  intelligence with
                  semantic retrieval,
                  citations, and
                  intelligent reasoning.

                </p>

              </div>
            )
          }

          {/* CHAT MESSAGES */}
          {
            messages.map(

              (msg, index) => (

                <div

                  key={index}

                  className={

                    msg.role === "user"

                    ? "flex justify-end"

                    : "flex justify-start"
                  }
                >

                  <div className={

                    msg.role === "user"

                    ? `
                    bg-blue-600
                    text-white
                    max-w-[75%]
                    rounded-2xl
                    px-5
                    py-4
                    shadow-lg
                    `
                    :

                    `
                    bg-slate-900
                    border
                    border-slate-800
                    text-slate-200
                    max-w-[75%]
                    rounded-2xl
                    px-5
                    py-4
                    `
                  }>

                    <div className="
                    flex
                    items-start
                    gap-3
                    ">

                      {
                        msg.role ===
                        "assistant"

                        ? (

                          <Bot
                          size={20}
                          className="
                          mt-1
                          text-cyan-400
                          "
                          />
                        )

                        : (

                          <User
                          size={20}
                          className="
                          mt-1
                          "
                          />
                        )
                      }

                      <div>

                        <p className="
                        whitespace-pre-wrap
                        leading-7
                        ">
                          {msg.content}
                        </p>

                        {/* CITATIONS */}
                        {
                          msg.citations
                          ?.length > 0 && (

                            <div className="
                            mt-5
                            space-y-3
                            ">

                              <h4 className="
                              text-sm
                              text-cyan-400
                              font-semibold
                              ">
                                Citations
                              </h4>

                              {
                                msg.citations.map(

                                  (citation, i) => (

                                    <div

                                      key={i}

                                      className="
                                      bg-slate-800
                                      rounded-xl
                                      p-3
                                      border
                                      border-slate-700
                                      "
                                    >

                                      <p className="
                                      text-xs
                                      text-cyan-400
                                      mb-1
                                      ">

                                        {
                                          citation.citation
                                        }

                                        {" • "}

                                        {
                                          citation.source
                                        }

                                      </p>

                                      <p className="
                                      text-sm
                                      text-slate-300
                                      line-clamp-4
                                      ">

                                        {
                                          citation.text
                                        }

                                      </p>

                                    </div>
                                  )
                                )
                              }

                            </div>
                          )
                        }

                      </div>

                    </div>

                  </div>

                </div>
              )
            )
          }

          {/* LOADING */}
          {
            loading && (

              <div className="
              flex
              justify-start
              ">

                <div className="
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                px-5
                py-4
                flex
                items-center
                gap-3
                text-slate-300
                ">

                  <Loader2
                  size={18}
                  className="
                  animate-spin
                  text-cyan-400
                  "
                  />

                  Thinking...

                </div>

              </div>
            )
          }

        </div>

      </div>

      {/* INPUT */}
      <div className="
      border-t
      border-slate-800
      bg-slate-950
      p-5
      ">

        <div className="
        max-w-4xl
        mx-auto
        flex
        items-center
        gap-3
        ">

          <input

            type="text"

            value={query}

            onChange={(e) =>
              setQuery(e.target.value)
            }

            onKeyDown={handleKeyDown}

            placeholder="
            Ask anything about
            your documents...
            "

            className="
            flex-1
            bg-slate-900
            border
            border-slate-700
            rounded-2xl
            px-5
            py-4
            outline-none
            text-white
            placeholder-slate-500
            focus:border-cyan-500
            transition
            "
          />

          <button

            onClick={handleAsk}

            disabled={loading}

            className="
            bg-gradient-to-r
            from-blue-600
            to-cyan-600
            hover:from-blue-700
            hover:to-cyan-700
            transition
            p-4
            rounded-2xl
            shadow-lg
            shadow-blue-500/20
            disabled:opacity-50
            "
          >

            {
              loading

              ? (
                <Loader2
                size={20}
                className="
                animate-spin
                "
                />
              )

              : (
                <Send size={20} />
              )
            }

          </button>

        </div>

      </div>

    </div>
  );
};

export default ChatSection;