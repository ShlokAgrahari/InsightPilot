import {
    Send
} from "lucide-react";

const ChatSection = () => {

    return (

        <div className="
        flex-1
        flex
        flex-col
        ">

            <div className="
            flex-1
            overflow-y-auto
            p-8
            ">

                <div className="
                max-w-4xl
                mx-auto
                ">

                    <div className="
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-2xl
                    p-6
                    ">

                        <p className="
                        text-slate-300
                        leading-7
                        ">

                            Welcome to
                            InsightPilot.

                            Upload your PDFs
                            and ask questions
                            using AI-powered
                            document intelligence.
                        </p>

                    </div>

                </div>

            </div>

            <div className="
            border-t
            border-slate-800
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
                    placeholder="
                    Ask anything
                    about your
                    documents...
                    "
                    className="
                    flex-1
                    bg-slate-900
                    border
                    border-slate-700
                    rounded-xl
                    px-5
                    py-4
                    outline-none
                    "
                    />

                    <button className="
                    bg-blue-600
                    hover:bg-blue-700
                    transition
                    p-4
                    rounded-xl
                    ">

                        <Send size={20} />

                    </button>

                </div>

            </div>

        </div>
    );
};

export default ChatSection;