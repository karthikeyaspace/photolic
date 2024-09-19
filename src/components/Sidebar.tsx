"use client";

import React, { useState } from "react";
import { Camera, ChevronDown } from "lucide-react";
import { ImageResProps, SidebarFormTypes } from "@/lib/types";
import {
  emotions,
  cameraPositions,
  places,
  aspectRatios,
} from "@/lib/constants";
import { generateImages } from "@/app/actions/generateImages";
import { useGeneration } from "@/hooks/useGeneration";
import { useImages } from "@/hooks/useImages";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [state, setState] = useState<SidebarFormTypes>({
    model: "flux-schnell",
    prompt: "",
    creativity: "50",
    emotion: emotions[0],
    cameraPosition: cameraPositions[0],
    place: places[0],
    numOutputs: 1,
    outputQuality: 75,
    outputFormat: "webp",
    aspectRatio: "1:1",
    seed: Math.floor(Math.random() * 1000000),
    disableSafetyChecker: false,
  });
  const { isGenerating, setIsGenerating, setOutputsCount } = useGeneration();
  const [useSeed, setUseSeed] = useState(false);
  const { refetch } = useImages();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setOutputsCount(state.numOutputs);
    if (state.prompt === "") return;
    try {
      const res = await generateImages(state);
      if (res.success) refetch(false);
    } catch (err) {
      console.log(err);
    }
    setIsGenerating(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      onSubmit={handleFormSubmit}
      className="p-6 bg-black text-white h-full flex flex-col overflow-y-auto small-scrollbar space-y-6"
    >
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">MODEL</h3>
        <div className="bg-[#2C2C2C] rounded relative">
          <select
            name="emotion"
            value={state.model}
            onChange={handleChange}
            className="bg-transparent w-full outline-none appearance-none px-3 h-10"
          >
            <option
              key={state.model}
              value={state.model}
              className="bg-gray-800"
            >
              Flux Schnell
            </option>
            <option className="bg-gray-800" disabled>
              Flux Dev
            </option>
            <option className="bg-gray-800" disabled>
              Stable Diffution
            </option>
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            size={18}
          />
        </div>
      </div>
      <h2 className="text-sm font-semibold mb-2">
        WHAT DO YOU WANT TO CREATE? (PROMPT)
      </h2>
      <div className="bg-[#2C2C2C] border border-blue-500 rounded mb-6">
        <textarea
          name="prompt"
          value={state.prompt}
          onChange={handleChange}
          placeholder="a photo of a cat eating popsicle"
          rows={3}
          className="bg-transparent w-full outline-none text-white p-3"
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">
          CREATIVITY VS. RESEMBLANCE
        </h3>
        <input
          type="range"
          name="creativity"
          value={state.creativity}
          onChange={handleChange}
          className="w-full appearance-none bg-[#2C2C2C] h-10 rounded-md"
          style={{
            background: `linear-gradient(to right, #3b82f6 ${state.creativity}%, #2C2C2C ${state.creativity}%)`,
          }}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">EMOTION</h3>
        <div className="bg-[#2C2C2C] rounded relative">
          <select
            name="emotion"
            value={state.emotion}
            onChange={handleChange}
            className="bg-transparent w-full outline-none appearance-none px-3 h-10"
          >
            {emotions.map((emotion) => (
              <option key={emotion} value={emotion} className="bg-gray-800">
                {emotion}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            size={18}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">CAMERA POSITION (BETA)</h3>
        <div className="bg-[#2C2C2C] rounded relative">
          <select
            name="cameraPosition"
            value={state.cameraPosition}
            onChange={handleChange}
            className="bg-transparent w-full outline-none appearance-none px-3 h-10"
          >
            {cameraPositions.map((position) => (
              <option key={position} value={position} className="bg-gray-800">
                {position}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            size={18}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">PLACE</h3>
        <div className="bg-[#2C2C2C] rounded relative">
          <select
            name="place"
            value={state.place}
            onChange={handleChange}
            className="bg-transparent w-full outline-none appearance-none px-3 h-10"
          >
            {places.map((place) => (
              <option key={place} value={place} className="bg-gray-800">
                {place}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            size={18}
          />
        </div>
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

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">SEED NUMBER</h3>
        <div className="flex items-center mb-2">
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

      <div className="text-sm text-blue-400 mb-6 cursor-pointer">
        Find other photos with this seed
      </div>

      <div className="flex items-center mb-4">
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
      </div>

      <button
        type="submit"
        disabled={isGenerating}
        className={`w-full ${
          isGenerating ? "bg-blue-300" : "bg-blue-500"
        } text-white p-3 rounded-md flex items-center justify-center mt-auto`}
      >
        <Camera className="mr-2" size={18} />
        Generate {state.numOutputs} photo{state.numOutputs > 1 && "s"} (4s)
      </button>
    </motion.form>
  );
};

export default Sidebar;
