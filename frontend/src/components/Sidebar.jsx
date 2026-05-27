import {
    LogOut,
    FileText,
    Upload
} from "lucide-react";

const Sidebar = () => {

    const user =
    JSON.parse(
        localStorage.getItem(
            "user"
        )
    );

    return (

        <div className="
        w-[280px]
        border-r
        border-slate-800
        bg-slate-900
        flex
        flex-col
        p-5
        ">

            <div>

                <h1 className="
                text-2xl
                font-bold
                ">
                    InsightPilot
                </h1>

                <p className="
                text-slate-400
                mt-1
                text-sm
                ">
                    AI Document Intelligence
                </p>

            </div>

            <div className="
            mt-8
            bg-slate-800
            rounded-xl
            p-4
            ">

                <p className="
                text-sm
                text-slate-400
                ">
                    Logged in as
                </p>

                <h2 className="
                font-semibold
                mt-1
                ">
                    {user?.name}
                </h2>

                <p className="
                text-sm
                text-slate-400
                ">
                    {user?.email}
                </p>

            </div>

            <button className="
            mt-6
            flex
            items-center
            justify-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            transition
            rounded-xl
            py-3
            font-medium
            ">

                <Upload size={18} />

                Upload PDF
            </button>

            <div className="
            mt-8
            flex-1
            overflow-y-auto
            ">

                <h3 className="
                text-sm
                text-slate-400
                mb-3
                ">
                    Uploaded Documents
                </h3>

                <div className="
                space-y-3
                ">

                    <div className="
                    bg-slate-800
                    rounded-lg
                    p-3
                    flex
                    items-center
                    gap-3
                    ">

                        <FileText
                        size={18}
                        />

                        <span className="
                        text-sm
                        truncate
                        ">

                            resume.pdf
                        </span>

                    </div>

                </div>

            </div>

            <button className="
            mt-4
            flex
            items-center
            gap-2
            text-red-400
            hover:text-red-500
            ">

                <LogOut size={18} />

                Logout
            </button>

        </div>
    );
};

export default Sidebar;