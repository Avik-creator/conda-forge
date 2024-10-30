"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

interface InstallerInfo {
  name: string;
  url: string;
  defaultChannel: string;
  description: string;
  isStandalone?: boolean;
}


export default function Component() {
  const [os, setOs] = useState("")
  const [arch, setArch] = useState("")
  const [installerType, setInstallerType] = useState("")

  const osArchitectures: Record<string, string[]> = {
    Linux: ["x64", "aarch64", "ppc64le"],
    macOS: ["x64", "ARM64"],
    Windows: ["x64", "ARM64 (Beta)"],
  }

  const installerData: Record<string,InstallerInfo> = {
    Anaconda: {
      name: "Anaconda",
      url: "https://docs.anaconda.com/free/anaconda/install/index.html",
      defaultChannel: "defaults",
      description: "Complete distribution for scientific Python development",
    },
    Miniconda: {
      name: "Miniconda",
      url: "https://docs.conda.io/en/latest/miniconda.html",
      defaultChannel: "defaults",
      description: "Minimal conda installer with Python",
    },
    Miniforge: {
      name: "Miniforge",
      url: "https://github.com/conda-forge/miniforge",
      defaultChannel: "conda-forge",
      description: "Community-driven minimal installer using conda-forge",
    },
    Mambaforge: {
      name: "Mambaforge",
      url: "https://github.com/conda-forge/miniforge#mambaforge",
      defaultChannel: "conda-forge",
      description: "Miniforge variant with mamba as default package manager",
    },
    Micromamba: {
      name: "Micromamba",
      url: "https://mamba.readthedocs.io/en/latest/installation.html#micromamba",
      defaultChannel: "conda-forge",
      description: "Standalone fast package manager (no conda required)",
      isStandalone: true,
    },
    Pixi: {
      name: "Pixi",
      url: "https://prefix.dev/docs/pixi/installation",
      defaultChannel: "conda-forge",
      description: "Modern package management solution for Python, C++, and R",
      isStandalone: true,
    },
  }

  const getInstallerDetails = () => {
    if (!os || !installerType) return null
    return installerData[installerType]
  }

  const installerDetails = getInstallerDetails()

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl rounded-lg border border-green-600 bg-white p-8 shadow-lg">
        <h2 className="mb-2 text-2xl font-semibold text-green-700">
          Conda Installer Selector
        </h2>
        <p className="mb-6 text-green-700">
          Choose your operating system, architecture, and installer type
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-green-700">Operating System</label>
            <select
              value={os}
              onChange={(e) => {
                setOs(e.target.value)
                setArch("")
              }}
              className="w-full rounded-lg border border-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Operating System</option>
              {Object.keys(osArchitectures).map((osName) => (
                <option key={osName}>{osName}</option>
              ))}
            </select>
          </div>

          {os && (
            <div>
              <label className="mb-1 block text-green-700">Architecture</label>
              <select
                value={arch}
                onChange={(e) => setArch(e.target.value)}
                className="w-full rounded-lg border border-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Architecture</option>
                {osArchitectures[os].map((arch) => (
                  <option key={arch}>{arch}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="mb-1 block text-green-700">Installer Type</label>
            <select
              value={installerType}
              onChange={(e) => setInstallerType(e.target.value)}
              className="w-full rounded-lg border border-green-600 p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Installer Type</option>
              {Object.entries(installerData).map(([key, data]) => (
                <option key={key} value={key}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>

          {installerDetails && (
            <div className="space-y-3 rounded-lg bg-green-50 p-4">
              <div className="text-green-800">
                <strong>Selected Configuration:</strong>
                <ul className="ml-6 mt-2 list-disc">
                  <li>OS: {os}</li>
                  {arch && <li>Architecture: {arch}</li>}
                  <li>Installer: {installerDetails.name}</li>
                  <li>Default Channel: {installerDetails.defaultChannel}</li>
                </ul>
              </div>

              <div>
                <p className="text-green-700">{installerDetails.description}</p>
                <a
                  href={installerDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-green-700 underline"
                >
                  Installation Guide 🚀
                </a>
              </div>

              {installerDetails.isStandalone && (
                <div className="flex items-start gap-2 rounded-lg bg-blue-50 p-4 text-blue-800">
                  <AlertCircle className="mt-1 h-4 w-4 flex-shrink-0" />
                  <p>
                    This is a standalone tool that doesn't require a full conda
                    installation.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}