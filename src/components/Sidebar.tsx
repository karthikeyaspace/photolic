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

const Sidebar = () => {
  const [state, setState] = useState<SidebarFormTypes>({
    prompt: "",
    creativity: "50",
    filmType: "",
    emotion: emotions[0],
    cameraPosition: cameraPositions[0],
    place: places[0],
    numOutputs: 1,
    aspectRatio: "1:1",
    useSeed: false,
    seed: "",
  });
  const { isGenerating, setIsGenerating, setOutputsCount } = useGeneration();
  const { addImages } = useImages();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setOutputsCount(state.numOutputs);
    try {
      const res = await generateImages(state);
      if (res.success) {
        addImages(res.data as ImageResProps[]);
      }
    } catch (err) {
      console.log(err);
    }
    setIsGenerating(false);
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="p-6 bg-black text-white h-full flex flex-col overflow-y-auto small-scrollbar "
    >
      <h2 className="text-sm font-semibold mb-2">
        WHAT DO YOU WANT TO CREATE? (PROMPT)
      </h2>
      <div className="bg-[#2C2C2C] border border-[#FF6B6B] rounded mb-6">
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
            background: `linear-gradient(to right, #FF6B6B ${state.creativity}%, #2C2C2C ${state.creativity}%)`,
          }}
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">FILM TYPE (BETA)</h3>
        <div className="bg-[#2C2C2C] rounded">
          <input
            type="text"
            name="filmType"
            value={state.filmType}
            onChange={handleChange}
            className="bg-transparent w-full outline-none px-3 h-10"
          />
        </div>
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
          max={4}
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
            checked={state.useSeed}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label htmlFor="useSeed" className="text-sm">
            Use seed to get similar photo
          </label>
        </div>
        {state.useSeed && (
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

      <button
        type="submit"
        disabled={isGenerating}
        className={`w-full ${
          isGenerating ? "bg-blue-300" : "bg-blue-500"
        } text-white p-3 rounded-md flex items-center justify-center mt-auto`}
      >
        <Camera className="mr-2" size={18} />
        Take 1 photo (~12s)
      </button>
    </form>
  );
};

export default Sidebar;
