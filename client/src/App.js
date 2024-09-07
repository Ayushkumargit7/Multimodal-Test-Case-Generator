import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import "./App.css";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { CircularProgress} from "@mui/material";

registerPlugin(FilePondPluginImagePreview);

const App = () => {
  const [context, setContext] = useState("");
  const [images, setImages] = useState([]);
  const [instructions , setInstructions] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!images.length) {
      alert("Please upload at least one screenshot.");
      return;
    }

    setLoading(true); 

    const formData = new FormData();
    formData.append("context", context);
    images.forEach((image) => {
      formData.append("images", image.file);
    });

    // Submit form data to backend.
    try {
      const response = await fetch("http://localhost:5000/api/describe", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Result:", result);
      setInstructions(result.description);
      console.log("Result.description", result.description);
      
    } catch (error) {
      console.error("Error submitting data:", error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="App p-8">
      <h1 className="text-4xl text-center">Testing Instructions Generator</h1>

      <h1 className="text-xl mb-1">Optional Context :</h1>
      <textarea
        className="border-slate-500 border-2 p-2 w-full mb-1"
        id="context"
        rows="4"
        value={context}
        onChange={(e) => setContext(e.target.value)}
      ></textarea>

      {/* Multi-image Uploader */}
      <FilePond
        files={images}
        onupdatefiles={setImages}
        allowMultiple={true}
        maxFiles={50}
        name="images"
        labelIdle='Drag & Drop your screenshots or <span class="filepond--label-action">Browse</span>'
      />

      {/* Submit Button and Loading Indicator */}
      <div className="mt-4">
        {loading ? (
          <CircularProgress /> 
        ) : (
          <button
            className="bg-green-400 p-2 rounded hover:bg-green-300"
            onClick={handleSubmit}
          >
            Describe Testing Instructions
          </button>
        )}
      </div>

      {instructions && (
        <div className="mt-4">
          <h1 className="text-3xl bg-sky-300 p-2">Testing Instructions</h1>
          <ReactMarkdown>{instructions}</ReactMarkdown> 
        </div>
      )}
      
    </div>
  );
};

export default App;
