import { useState } from "react";

export default function App() {
  const [os, setOs] = useState("");
  const [installerType, setInstallerType] = useState("");
  const getInstallerDetails = () => {
    if (!os || !installerType)
      return {
        name: "",
        url: "",
      };

    const installerData = {
      Anaconda: {
        name: "Anaconda",
        url: "https://docs.anaconda.com/free/anaconda/install/index.html",
      },
      Miniconda: {
        name: "Miniconda",
        url: "https://docs.conda.io/en/latest/miniconda.html",
      },
      Miniforge: {
        name: "Miniforge",
        url: "https://github.com/conda-forge/miniforge",
      },
      Mambaforge: {
        name: "Mambaforge",
        url: "https://github.com/conda-forge/miniforge#mambaforge",
      },
      Micromamba: {
        name: "Micromamba",
        url: "https://mamba.readthedocs.io/en/latest/installation.html#micromamba",
      },
    }[installerType];

    return installerData;
  };

  const installerDetails = getInstallerDetails();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border border-green-600 p-8 rounded-lg w-96">
        <h2 className="text-green-700 text-2xl font-semibold mb-2">
          Conda Installer Selector
        </h2>
        <p className="text-green-700 mb-6">
          Choose your operating system and installer type
        </p>
        <div className="mb-4">
          <label className="block text-green-700 mb-1">Operating System</label>
          <select
            onChange={(e) => setOs(e.target.value)}
            className="w-full border border-green-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Operating System</option>
            <option>macOS</option>
            <option>Windows</option>
            <option>Linux</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-green-700 mb-1">Installer Type</label>
          <select
            onChange={(e) => setInstallerType(e.target.value)}
            className="w-full border border-green-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select Installer Type</option>
            <option value="Miniconda">Miniconda installer</option>
            <option value="Anaconda">Anaconda installer</option>
            <option value="Miniforge">Miniforge installer</option>
            <option value="Mambaforge">Mambaforge installer</option>
            <option value="Micromamba">Micromamba installer</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-green-700 mb-1">
            Selected Installer:
          </label>
          <div className="bg-green-100 text-green-700 p-2 rounded-lg">
            {os && installerType ? (
              <>
                Here is the link to download{" "}
                <strong>{installerDetails?.name}</strong> for{" "}
                <strong>{os}</strong>: <br />
                <a
                  href={installerDetails?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline"
                >
                  Link
                </a>{" "}
                🚀
              </>
            ) : (
              "Please select both OS and installer type"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
