"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeftFromLineIcon,
  Camera,
  ChevronDown,
  RefreshCw,
  Star,
} from "lucide-react";
import { ImageResProps, SidebarFormTypes } from "@/lib/types";
import {
  models,
  emotions,
  cameraPositions,
  places,
  aspectRatios,
  lightingOptions,
} from "@/lib/constants";
import { generateImages } from "@/app/actions/generateImages";
import { useImages } from "@/hooks/useImages";
import { useUser } from "@/hooks/useUser";
import { motion } from "framer-motion";
import t from "@/lib/Toast";
import { getSeed } from "@/lib/utils";

const Sidebar = () => {
  const { isGenerating, setIsGenerating, setOutputsCount, addImages } =
    useImages();
  const { user, setUser, setApiKeyDiv, apiKey, setShowSideBar } = useUser();
  const [useSeed, setUseSeed] = useState(false);

  const [prompt, setPrompt] = useState({
    text: "",
    emotion: emotions[0],
    cameraPosition: cameraPositions[0],
    place: places[0],
    lighting: lightingOptions[0],
    additionalDetails: "",
  });

  const [state, setState] = useState<SidebarFormTypes>({
    model: "black-forest-labs/flux-schnell",
    prompt: "",
    numOutputs: 1,
    outputQuality: 75,
    outputFormat: "webp",
    aspectRatio: "1:1",
    seed: getSeed(),
    disableSafetyChecker: false,
    useApiKey: !!apiKey,
    apiKey: "",
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, apiKey: apiKey }));
  }, [apiKey]);

  useEffect(() => {
    const generatedPrompt = `${prompt.text} ${
      prompt.emotion && "with " + prompt.emotion + " expression,"
    } ${prompt.cameraPosition && prompt.cameraPosition + " view,"}${
      prompt.place && "in " + prompt.place + ", "
    } ${prompt.lighting && prompt.lighting + " lighting. "} ${
      prompt.additionalDetails
    } 8K DSLR photorealistic quality`.trim();
    setState((prev) => ({ ...prev, prompt: generatedPrompt }));
  }, [prompt]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePromptChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setPrompt((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (user.credits < state.numOutputs || user.credits <= 0) &&
      !state.useApiKey
    ) {
      t("Insufficient credits, cannot generate images", "info");
      return;
    }
    if (state.useApiKey && !apiKey) {
      setApiKeyDiv(true);
      t("Please enter your API key", "info");
      return;
    }
    if (window.innerWidth < 768) setShowSideBar((prev) => !prev);
    setOutputsCount(state.numOutputs);
    setIsGenerating(true);
    try {
      const res = await generateImages(state);
      if (res.success) {
        console.log(res);
        t("Images generated successfully", "success");
        addImages(res.data as ImageResProps[]);
        const nc = res.newCredits;
        if (nc !== undefined) setUser((prev) => ({ ...prev, credits: nc }));
      } else {
        t(res.message || "Failed to generate images", "error");
      }
      setIsGenerating(false);
    } catch (err) {
      console.log(err);
      t("Failed to generate images", "error");
    }
    setIsGenerating(false);
  };

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setPrompt({
      text: "",
      emotion: emotions[0],
      cameraPosition: cameraPositions[0],
      place: places[0],
      lighting: lightingOptions[0],
      additionalDetails: "",
    });

    setState({
      model: "black-forest-labs/flux-schnell",
      prompt: "",
      numOutputs: 1,
      outputQuality: 75,
      outputFormat: "webp",
      aspectRatio: "1:1",
      seed: Math.floor(Math.random() * 1000000),
      disableSafetyChecker: false,
      useApiKey: !!apiKey,
      apiKey: "",
    });
  };

  const selectComponent = (name: string, label: string, options: string[]) => {
    return (
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">{label}</h3>
        <div className="bg-[#2C2C2C] rounded relative">
          <select
            name={name}
            value={prompt[name as keyof typeof prompt]}
            onChange={handlePromptChange}
            className="bg-transparent w-full outline-none appearance-none px-3 h-10"
          >
            {options.map((option) => (
              <option key={option} value={option} className="bg-gray-800">
                {option}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            size={18}
          />
        </div>
      </div>
    );
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleFormSubmit}
      className="px-6 py-10 pb-16 md:py-6 bg-black text-white h-full flex flex-col overflow-y-auto small-scrollbar space-y-6 z-30"
    >
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">MODEL</h3>
        <div
          className="absolute top-3 right-6 block md:hidden z-30 p-1 rounded-full"
          onClick={() => setShowSideBar(false)}
        >
          <ArrowLeftFromLineIcon />
        </div>
        <div className="bg-[#2C2C2C] rounded relative">
          <select
            name="model"
            value={state.model}
            onChange={handleChange}
            className="bg-transparent w-full outline-none appearance-none px-3 h-10"
          >
            {models.map((model) => (
              <option key={model} value={model} className="bg-gray-800">
                {model}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            size={18}
          />
        </div>
      </div>

      <button className="py-1 w-1/4 bg-blue-700 rounded" onClick={handleReset}>
        Reset
      </button>

      <h2 className="text-sm font-semibold mb-2">
        WHAT DO YOU WANT TO CREATE? (PROMPT)
      </h2>
      <div className="bg-[#2C2C2C] border border-blue-500 rounded mb-6">
        <textarea
          name="text"
          value={prompt.text}
          onChange={handlePromptChange}
          placeholder="a photo of a cat eating popsicle"
          rows={3}
          required
          className="bg-transparent w-full outline-none text-white p-3"
        />
      </div>

      {selectComponent("emotion", "EMOTION", emotions)}
      {selectComponent("cameraPosition", "CAMERA POSITION", cameraPositions)}
      {selectComponent("place", "PLACE", places)}
      {selectComponent("lighting", "LIGHTING", lightingOptions)}

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">ADDITIONAL DETAILS</h3>
        <textarea
          name="additionalDetails"
          value={prompt.additionalDetails}
          onChange={handlePromptChange}
          placeholder="Add any additional details"
          rows={2}
          className="bg-[#2C2C2C] w-full outline-none p-3  rounded "
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">NUMBER OF PHOTOS</h3>
        <input
          type="number"
          name="numOutputs"
          value={state.numOutputs}
          min={1}
          max={2}
          onChange={handleChange}
          placeholder="Enter number of photos"
          className="bg-[#2C2C2C] w-full outline-none px-3 h-10 rounded"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">ASPECT RATIO</h3>
        <div className="bg-[#2C2C2C] rounded relative">
          <select
            name="aspectRatio"
            value={state.aspectRatio}
            onChange={handleChange}
            className="bg-transparent w-full outline-none appearance-none px-3 h-10"
          >
            {aspectRatios.map((ar) => (
              <option key={ar} value={ar} className="bg-gray-800">
                {ar}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            size={18}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold flex justify-start items-center gap-2 mb-2">
          SEED NUMBER
          <RefreshCw
            size={16}
            onClick={() => {
              setState((prev) => ({ ...prev, seed: getSeed() }));
            }}
            className="cursor-pointer"
          />
        </h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="useSeed"
            name="useSeed"
            checked={useSeed}
            onChange={() => setUseSeed((prev) => !prev)}
            className="mr-2"
          />
          <label htmlFor="useSeed" className="text-sm">
            Use seed to get similar photo
          </label>
        </div>
        {useSeed && (
          <input
            type="text"
            name="seed"
            value={state.seed}
            onChange={handleChange}
            placeholder="Enter seed number"
            className="bg-[#2C2C2C] w-full outline-none px-3 h-10 rounded"
          />
        )}
      </div>

      {/* <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="disableSafetyChecker"
          name="disableSafetyChecker"
          checked={state.disableSafetyChecker}
          onChange={(e) =>
            setState((prev) => ({
              ...prev,
              disableSafetyChecker: e.target.checked,
            }))
          }
          className="mr-2"
        />
        <label htmlFor="disableSafetyChecker" className="text-sm">
          Disable safety checker
        </label>
      </div> */}

      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="apiKey"
          name="apiKey"
          checked={state.useApiKey}
          onChange={(e) => {
            setState((prev) => ({ ...prev, useApiKey: e.target.checked }));
          }}
          className="mr-2"
        />
        <label htmlFor="apiKey" className="text-sm">
          Use my API key
        </label>
      </div>

      <button
        type="submit"
        disabled={isGenerating}
        className={`w-full ${
          isGenerating ? "bg-blue-300" : "bg-blue-500"
        } text-white p-3 rounded-md flex items-center justify-center mt-auto`}
      >
        <Camera className="mr-2" size={18} />
        Generate {state.numOutputs} photo{state.numOutputs > 1 && "s"} (~
        {state.numOutputs * 2.5}s){" "}
        <p className="ml-4 ">{!state.useApiKey ? state.numOutputs : 0}</p>
        <Star size={18} className="text-yellow-500 ml-px" fill="#eab308" />
      </button>
    </motion.form>
  );
};

export default Sidebar;
