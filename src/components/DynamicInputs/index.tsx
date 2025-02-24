import { useState } from "react";
import CustomInput from "../CustomInput";
import {
  faImage,
  faUserGroup,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import MagicButton from "../MagicButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostulateImg from "../PostulateImg";
import { motion } from "framer-motion";
import { supabase } from "../../utils/supabase";

interface Candidate {
  name: string;
  image: File | null;
}

interface DynamicInputsProps {
  allowImages?: boolean;
  title: string;
  candidates: Candidate[];
  setCandidates: (candidates: Candidate[]) => void;
}

const DynamicInputs = ({
  allowImages = true,
  title,
  candidates,
  setCandidates,
}: DynamicInputsProps) => {
  const handleAddCandidate = () => {
    setCandidates([...candidates, { name: "", image: null }]);
  };

  const handleRemoveCandidate = (index: number) => {
    setCandidates(candidates.filter((_, i) => i !== index));
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
    <div className="flex flex-col justify-center items-center w-full h-full mt-5">
      <p className="text-4xl font-extrabold">{title}</p>
      <div className="w-[80%] h-[90vh] max-h-[95vh] overflow-y-auto overflow-x-hidden flex flex-col items-center p-4 gap-4 bg-white rounded-lg m-2">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className={`flex flex-row ${
              allowImages ? "justify-between" : "justify-center"
            } items-center rounded-md w-[90%] h-[15%] shrink-0`}
          >
            <CustomInput
              name={`input-${index + 1}`}
              icon={faUserGroup}
              onBlur={() => {}}
              onChange={(e) => handleChangeName(index, e.target.value)}
              placeholder={`#${index + 1}`}
              className="w-[50%]"
              inputAttributes={{ autoComplete: "off" }}
            />
            {allowImages && (
              <motion.div
                className="relative h-full w-[20%]"
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
            )}
            <button
              className="p-2 text-red-600 hover:text-red-800"
              onClick={() => handleRemoveCandidate(index)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
      <MagicButton
        style="styled"
        className="flex flex-row gap-2"
        onClick={handleAddCandidate}
      >
        Nuevo Campo
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </MagicButton>
    </div>
  );
};

const DynamicFormContainer = () => {
  const [applicants, setApplicants] = useState<Candidate[]>([
    { name: "", image: null },
  ]);
  const [groups, setGroups] = useState<Candidate[]>([
    { name: "", image: null },
  ]);

  const handleUpload = async () => {
    const allFieldsFilled = (candidates: Candidate[], allowImages: boolean) =>
      candidates.every(
        (candidate) =>
          candidate.name.trim() !== "" &&
          (allowImages ? candidate.image !== null : true)
      );

    if (!allFieldsFilled(applicants, true) || !allFieldsFilled(groups, false)) {
      alert("Por favor, completa todos los campos antes de subir.");
      return;
    }

    const uploadCandidates = async (
      candidates: Candidate[],
      collection: string,
      allowImages: boolean
    ) => {
      for (let index = 0; index < candidates.length; index++) {
        const candidate = candidates[index];
        let imageUrl = null;

        if (allowImages && candidate.image) {
          const fileName = `postulado-${index}-${candidate.image.name}`;
          const { error } = await supabase.storage
            .from("PostImages")
            .upload(fileName, candidate.image, {
              cacheControl: "3600",
              upsert: false,
            });

          if (error) {
            console.error("Error subiendo imagen:", error);
            continue;
          }

          imageUrl = `https://hrktgmxmirhfcggobzvf.supabase.co/storage/v1/object/public/PostImages/${fileName}`;
        }

        const { error } = await supabase
          .from(collection)
          .insert(
            allowImages
              ? { name: candidate.name, img_url: imageUrl }
              : { name: candidate.name }
          );

        if (error) {
          console.error("Error al insertar en Supabase:", error);
        }
      }
    };

    await uploadCandidates(applicants, "Applicants", true);
    await uploadCandidates(groups, "Groups", false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <DynamicInputs
        title="Postulaciones"
        candidates={applicants}
        setCandidates={setApplicants}
      />
      <DynamicInputs
        allowImages={false}
        title="Grupos"
        candidates={groups}
        setCandidates={setGroups}
      />
      <MagicButton
        style="styled"
        onClick={handleUpload}
        className="text-md rounded-full bg-blue-500 text-white w-[100%] mt-4"
      >
        Subir Todo
      </MagicButton>
    </div>
  );
};

export default DynamicFormContainer;
