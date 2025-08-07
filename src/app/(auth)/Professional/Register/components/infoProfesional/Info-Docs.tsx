import { FormikErrors, FormikTouched } from "formik";

type Props = {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
};


export const Info_Docs = ({errors, setFieldValue, touched}:Props) => {
    return (
        <div>
            <h3 className="mb-4 font-bold">Documentos Requeridos</h3>
            <div className="flex flex-col items-center gap-6 mt-6 mb-10">
                <div className="flex flex-col items-center p-4 border-2 border-gray-500 border-dashed rounded-xl"> 
                    <div className="mb-4 text-center">
                        <h4 className="text-lg font-bold">Matrícula Profesional *</h4> 
                        <span>Carga tu licencia actual</span>      
                    </div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        multiple   
                        onChange={(e) => {
                            const archivos = e.currentTarget.files;
                            if (!archivos) return;
                            const archivosArray = Array.from(archivos).slice(0, 2);
                            setFieldValue("matricula", archivosArray);
                        }}
                        >
                    </input>
                    {typeof errors.matricula === "string" && touched.matricula && (
                        <p className="text-sm text-red-600">{errors.matricula}</p>
                    )}
                </div>

                <div className="flex flex-col items-center p-4 border-2 border-gray-500 border-dashed rounded-xl"> 
                    <div className="mb-4 text-center">
                        <h4 className="text-lg font-bold">Seguro de mala praxis</h4> 
                        <span>Certificado de seguro actual</span>          
                    </div>
                    <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={(e) => {
                            const archivos = e.currentTarget.files;
                            if (!archivos) return;
                            const archivosArray = Array.from(archivos).slice(0, 2);
                            setFieldValue("seguro", archivosArray);
                        }}
                    >
                    </input>
                    {typeof errors.seguro === "string" && touched.seguro && (
                        <p className="text-sm text-red-600">{errors.seguro}</p>
                    )}
                </div>
            </div>
        </div>
    )
}