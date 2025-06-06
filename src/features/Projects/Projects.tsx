import { useState } from "react";
import { useLanguage } from "../../i18n/LanguagesContext";
import Modal from "../../components/Modal";

const Projects = () => {
    const { t } = useLanguage();
    const [selectedProject, setSelectedProject] = useState<number | null>(null);
    
    return (
        <div className="flex flex-col items-center justify-start bg-white text-[#324681] mt-8">
            <p className="text-lg mb-6">{t.projects.description}</p>
            <div className="grid grid-cols-3 gap-4 w-full max-w-md justify-items-center">
            {t.projects.list.map((project, index) => (
            <div
                key={index}
                className="flex items-center justify-center w-[50px] h-[50px] bg-white border border-[#324681] shadow cursor-pointer overflow-hidden opacity-70 hover:opacity-100"
                onClick={() => setSelectedProject(index)}
            >
                <span className="truncate max-w-full px-1 text-center z-10">
                {project.title}
                </span>
            </div>
            ))}
            </div>
            <Modal
                isOpen={selectedProject !== null}
                onClose={() => setSelectedProject(null)}
            >
                <div className="flex flex-col items-center p-4">
                    <h2 className="text-xl font-semibold mb-2">
                        {selectedProject !== null ? t.projects.list[selectedProject].title : ""}
                    </h2>
                    <img
                        src={selectedProject !== null ? `../projects/${selectedProject+1}.jpg` : ""}
                        className="w-auto max-h-[200px] rounded mb-4"
                        style={{ maxHeight: 200, width: "auto" }}
                        alt={selectedProject !== null ? t.projects.list[selectedProject].title : ""}
                    />
                    <div className="text-center mb-4">
                        {selectedProject !== null && t.projects.list[selectedProject].description}
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default Projects;
