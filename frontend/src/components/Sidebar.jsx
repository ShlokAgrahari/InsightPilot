import {
  LogOut,
  FileText,
  Upload,
  Loader2
} from "lucide-react";

import {
  useRef,
  useState,
  useEffect
} from "react";

import toast from "react-hot-toast";

import api from "../services/api";

import useAuthStore
from "../store/authStore";

const Sidebar = () => {

  const user =
  JSON.parse(
    localStorage.getItem("user")
  );

  const logout =
  useAuthStore(
    (state) => state.logout
  );

  const fileInputRef =
  useRef(null);

  const [loading,
  setLoading] =
  useState(false);

  const [documents,
  setDocuments] =
  useState([]);


  // FETCH DOCUMENTS
  const fetchDocuments =
  async () => {

    try {

      const res =
      await api.get(
        "/documents"
      );

      console.log(
        "Fetched Documents:",
        res.data
      );

      setDocuments(
        res.data.documents
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to load documents"
      );
    }
  };


  // LOAD DOCS ON PAGE LOAD
  useEffect(() => {

    fetchDocuments();

  }, []);


  // HANDLE PDF UPLOAD
  const handleUpload =
  async (e) => {

    try {

      const files =
      Array.from(
        e.target.files
      );

      if (!files.length) return;

      setLoading(true);

      // UPLOAD EACH FILE
      for (const file of files) {

        const formData =
        new FormData();

        formData.append(
          "pdf",
          file
        );

        const res =
        await api.post(

          "/documents/upload",

          formData,

          {
            headers: {
              "Content-Type":
              "multipart/form-data",
            },
          }
        );

        console.log(
          "Upload Response:",
          res.data
        );
      }

      // REFRESH DOCUMENTS
      await fetchDocuments();

      toast.success(
        "PDF uploaded successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message
        || "Upload failed"
      );

    } finally {

      setLoading(false);
    }
  };


  // LOGOUT
  const handleLogout = () => {

    logout();
  };


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

      {/* FILE INPUT */}
      <input
        type="file"
        multiple
        accept=".pdf"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
      />

      {/* HEADER */}
      <div>

        <h1 className="
        text-2xl
        font-bold
        text-white
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

      {/* USER CARD */}
      <div className="
      mt-8
      bg-slate-800
      rounded-2xl
      p-4
      border
      border-slate-700
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
        text-white
        ">
          {user?.name}
        </h2>

        <p className="
        text-sm
        text-slate-400
        truncate
        ">
          {user?.email}
        </p>

      </div>

      {/* UPLOAD BUTTON */}
      <button

        onClick={() =>
          fileInputRef.current.click()
        }

        disabled={loading}

        className="
        mt-6
        flex
        items-center
        justify-center
        gap-2
        bg-gradient-to-r
        from-blue-600
        to-cyan-600
        hover:from-blue-700
        hover:to-cyan-700
        transition-all
        duration-300
        rounded-2xl
        py-3
        font-medium
        text-white
        shadow-lg
        shadow-blue-500/20
        disabled:opacity-50
        "
      >

        {
          loading
          ? (
            <Loader2
              size={18}
              className="animate-spin"
            />
          )
          : (
            <Upload size={18} />
          )
        }

        {
          loading
          ? "Uploading..."
          : "Upload PDF"
        }

      </button>

      {/* DOCUMENTS */}
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

          {
            documents.length === 0
            ? (

              <div className="
              text-slate-500
              text-sm
              bg-slate-800
              rounded-xl
              p-4
              text-center
              ">
                No documents uploaded
              </div>

            ) : (

              documents.map((doc) => (

                <a

                  key={doc._id}

                  href={
                    doc.cloudinaryUrl
                    || "#"
                  }

                  target="_blank"

                  rel="noreferrer"

                  className="
                  bg-slate-800
                  hover:bg-slate-700
                  transition
                  rounded-xl
                  p-3
                  flex
                  items-center
                  gap-3
                  border
                  border-slate-700
                  cursor-pointer
                  "
                >

                  <FileText
                    size={18}
                    className="
                    text-cyan-400
                    "
                  />

                  <span className="
                  text-sm
                  truncate
                  text-white
                  ">

                    {doc.fileName}

                  </span>

                </a>
              ))
            )
          }

        </div>

      </div>

      {/* LOGOUT */}
      <button

        onClick={handleLogout}

        className="
        mt-4
        flex
        items-center
        gap-2
        text-red-400
        hover:text-red-500
        transition
        "
      >

        <LogOut size={18} />

        Logout

      </button>

    </div>
  );
};

export default Sidebar;