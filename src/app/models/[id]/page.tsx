"use client";

import React, { use } from "react";
import ModelViewer from "@/components/models/ModelViewer";

const modelData: Record<string, { title: string, description: string, modelPath: string }> = {
  "gum-teeth": {
    title: "Human Gum and Teeth",
    description: "The human mouth is equipped with a variety of teeth that play a crucial role in both digestion and speech. The primary dentition consists of 20 teeth, with 10 in each arch, and the permanent dentition consists of 32 teeth, with 16 in each arch. The teeth are organized into two opposing arches: maxillary (upper) and mandibular (lower), and are positioned in alveolar sockets connected to the bone by a periodontal ligament. The teeth are made up of enamel, dentin, cementum, and pulp, with enamel being the hardest and most mineralized substance of the body. The different types of teeth, each adapted for specific functions, include incisors, canines, premolars, and molars. These teeth are activated by powerful jaw muscles, while saliva produced by the salivary glands facilitates lubrication, aiding in the swallowing process. The arrangement and quantity of teeth in vertebrates are categorized using a dental formula, expressed as fractions that detail the number and types of teeth present.",
    modelPath: "/all-models/Human Gum And Teeth/8b3c0252a52d48e19e6e7aa08d78a443_Textured.gltf"
  },
  "placenta": {
    title: "Human Placenta",
    description: "The placenta is a temporary organ that develops in the uterus during pregnancy. It provides oxygen and nutrients to the growing baby and removes waste products from the baby's blood. The placenta attaches to the wall of the uterus, and the baby's umbilical cord develops from it. This critical organ acts as a lifeline between the mother and the fetus, ensuring the proper development and health of the unborn child throughout gestation.",
    modelPath: "/all-models/Placenta/430d73f248674d1d865b620fe8e46cff_Textured.gltf"
  },
  "male-reproductive": {
    title: "Male Reproductive System",
    description: "The male reproductive system is a complex network of internal and external organs that work together to produce, maintain, and transport sperm and protective fluid (semen). Key components include the testes, which produce sperm and testosterone; the duct system (epididymis and vas deferens); the accessory glands (prostate and seminal vesicles); and the penis. This system is essential for human reproduction and is regulated by a delicate balance of hormones.",
    modelPath: "/all-models/Male Reproductive System/303616cbd453476da6cde6f85cf3093e.gltf"
  },
  "stomach-cross": {
    title: "Stomach Cross Section",
    description: "The stomach is a muscular, J-shaped organ in the upper abdomen. It is part of the digestive system, which extends from the mouth to the anus. The stomach has four main functions: temporary storage of food, mixing and breakdown of food by contraction and relaxation of the muscle layers, digestion of food, and regulation of the passage of food into the small intestine. This cross-section reveals the complex layers of the stomach wall, including the mucosa, submucosa, muscularis, and serosa, which work together to process nutrients.",
    modelPath: "/all-models/Stomach Cross Section/7148476c702340aab6a6579124103ea9_Textured.gltf"
  },
  "kidney-cross": {
    title: "Kidney Cross Section",
    description: "The kidney is a bean-shaped organ that filters blood to produce urine. This cross-section highlights the internal structures: the cortex (outer layer), the medulla (containing renal pyramids), and the renal pelvis (where urine collects before entering the ureter). Kidneys are vital for maintaining fluid balance, regulating blood pressure, and filtering out toxins from the body.",
    modelPath: "/all-models/Kidney Cross Section/fde537a7868b4f8db87450720dc7611f.gltf"
  },
  "human-skull": {
    title: "Human Skull",
    description: "The human skull is a bony structure that forms the head in the human skeleton. It supports the structures of the face and forms a protective cavity for the brain. The skull is composed of two parts: the cranium and the mandible. In humans, these two parts are the neurocranium and the viscerocranium or facial skeleton that includes the mandible as its largest bone.",
    modelPath: "/all-models/Human Skull/537aa4307a4a4fe48f6046bf108bee55_Textured.gltf"
  },
  "ovum-stages": {
    title: "Fertilization Stages of Ovum",
    description: "Fertilization is the fusion of a sperm cell and an ovum (egg) to form a zygote. This model illustrates the various stages of ovum fertilization, from the moment of penetration by a single sperm to the subsequent stages of cleavage and early embryonic development. This process marks the beginning of a new life and involves complex biological interactions within the female reproductive system.",
    modelPath: "/all-models/Fertilization Stages of Ovum/55e096bc8478488bb789cbe3b9d76441_Textured.gltf"
  },
  "heart": {
    title: "Human Heart",
    description: "The human heart is a muscular organ about the size of a closed fist that functions as the body's circulatory pump. It takes in deoxygenated blood through the veins and delivers it to the lungs for oxygenation before pumping it into the various arteries (which provide oxygen and nutrients to body tissues). The heart is located in the thoracic cavity, slightly to the left of the midline. It is divided into four chambers: the right and left atria, and the right and left ventricles. This complex organ beats approximately 100,000 times a day, ensuring that every cell in the body receives the oxygen and nutrients it needs to survive.",
    modelPath: "/all-models/Heart/3f8072336ce94d18b3d0d055a1ece089_Textured.gltf"
  },
  "ear-section": {
    title: "Human Ear Section",
    description: "The human ear is a complex organ responsible for both hearing and maintaining balance. This section illustrates the internal anatomy of the ear, including the outer ear (pinna and ear canal), the middle ear (eardrum and ossicles), and the inner ear (cochlea and semicircular canals). Sound waves travel through the ear canal to the eardrum, which vibrates and sends signals through the ossicles to the cochlea. The cochlea then converts these vibrations into electrical signals that the brain interprets as sound. The inner ear also contains the vestibular system, which helps the body maintain its orientation and balance.",
    modelPath: "/all-models/Ear Section/a589772ee0ff4fb587babd9901ea6ffe_Textured.gltf"
  },
  "human-eye": {
    title: "Human Eye",
    description: "The human eye is a specialized sense organ that reacts to light and allows vision. It is essentially a biological camera that captures light through a lens and projects it onto a light-sensitive retina. Key components include the cornea (the clear front surface), the iris (which controls light entry), the lens (for focusing), and the retina (which contains photoreceptor cells). These cells convert light into electrical impulses that travel via the optic nerve to the brain, where they are processed into the images we see. The eye is protected by the orbit (bony socket) and the eyelids, and is lubricated by tears produced by the lacrimal glands.",
    modelPath: "/all-models/Human Eye/417cbd1aac554ea189966250b784ab6f_Textured.gltf"
  },
  "human-thorax": {
    title: "Human Thorax",
    description: "The thorax is the region of the body between the neck and the abdomen. It is protected by the rib cage and contains vital organs such as the heart, lungs, and esophagus. The thoracic cavity is separated from the abdominal cavity by the diaphragm, a major muscle involved in breathing. This model illustrates the skeletal structure of the chest, including the ribs, sternum, and thoracic vertebrae, as well as the arrangement of major internal organs. Understanding thoracic anatomy is essential for medical fields such as cardiology, pulmonology, and thoracic surgery.",
    modelPath: "/all-models/Human Throax/4aba9b2ced344bdf8f09656c6a298b50.gltf"
  },
  "female-skeleton": {
    title: "Female Human Skeleton",
    description: "The female human skeleton is the internal framework of the female body. While sharing many similarities with the male skeleton, it exhibits distinct sexual dimorphism, primarily in the pelvis, which is wider and shallower to facilitate childbirth. Other differences often include a smaller overall size, more delicate bone structures, and variations in the skull and long bones. The skeleton serves as the foundation for the body, providing support, protection for internal organs, and points of attachment for muscles. It is also involved in blood cell production and mineral storage. This model allows for a detailed examination of the osteological features that define the female human form.",
    modelPath: "/all-models/Feamle Human Skeleton/5f28b52cab3e439490727e0aede55a6b_Textured.gltf"
  },
  "male-skeleton": {
    title: "Male Human Skeleton",
    description: "The male human skeleton is the primary structural framework of the male body. It typically features a narrower and deeper pelvis compared to the female skeleton, and often has larger, more pronounced bone markings where muscles attach, reflecting generally greater muscle mass. The skeleton consists of 206 bones in the adult, categorized into the axial skeleton (skull, vertebral column, and rib cage) and the appendicular skeleton (limbs and girdles). It provides essential support, protects vital organs, and enables movement through interaction with the muscular system. This model provides a comprehensive overview of the male osteological structure.",
    modelPath: "/all-models/Male Skeleton/11b57ebfcf6c4e3b88d0cbe618ee70a7_Textured.gltf"
  }
};

export default function ModelPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const data = modelData[id];

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#020205] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Model Not Found</h1>
          <button onClick={() => window.history.back()} className="text-[#00f0ff] hover:underline">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <ModelViewer 
      title={data.title}
      description={data.description}
      modelPath={data.modelPath}
    />
  );
}
