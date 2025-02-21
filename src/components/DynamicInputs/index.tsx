import { useState } from "react";
import CustomInput from "../CustomInput";
import { faImage, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import MagicButton from "../MagicButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostulateImg from "../PostulateImg";
import { motion } from "framer-motion";

interface Candidate {
  name: string;
  image: File | null;
}

const DynamicInputs = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { name: "", image: null },
  ]);

  const handleAddCandidate = () => {
    setCandidates([...candidates, { name: "", image: null }]);
  };

  const handleChangeName = (index: number, value: string) => {
    const newCandidates = [...candidates];
    newCandidates[index].name = value;
    setCandidates(newCandidates);
  };

  const handleImageUpload = (index: number, file: File | null) => {
    const newCandidates = [...candidates];
    newCandidates[index].image = file;
    setCandidates(newCandidates);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <p className="text-4xl font-extrabold">Postulaciones</p>
      <div className="w-[80%] h-[90vh] max-h-[95vh] overflow-y-auto overflow-x-hidden flex flex-col items-center p-4 gap-4 bg-white rounded-lg m-2">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-around rounded-md w-[90%] h-[15%] shrink-0"
          >
            <CustomInput
              value={candidate.name}
              icon={faUserGroup}
              onBlur={() => {}}
              onChange={(e) => handleChangeName(index, e.target.value)}
              placeholder={`Postulado ${index + 1}`}
              className="w-[50%]"
            />
            <motion.div
              className="relative h-full w-[20%] "
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <input
                type="file"
                accept="image/*"
                className="absolute h-full opacity-0 cursor-pointer w-min"
                onChange={(e) =>
                  handleImageUpload(
                    index,
                    e.target.files ? e.target.files[0] : null
                  )
                }
              />
              <PostulateImg className="flex justify-center items-center w-[80%] h-[100%] rounded-lg overflow-hidden">
                {candidate.image ? (
                  <img
                    src={URL.createObjectURL(candidate.image)}
                    alt={`Postulado ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon
                    className="text-white p-4 bg-[#2296f5] rounded-full shadow-md shadow-zinc-600"
                    icon={faImage}
                  />
                )}
              </PostulateImg>
            </motion.div>
          </div>
        ))}
      </div>
      <MagicButton
        style="styled"
        onClick={handleAddCandidate}
        className="p-2 w-[5%] h-[10%] text-5xl rounded-full mt-4 fixed right-0 bottom-0 m-5"
      >
        +
      </MagicButton>
    </div>
  );
};

export default DynamicInputs;
