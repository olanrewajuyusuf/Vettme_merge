import { Input } from "@/components/ui/input";
import { statesInNigeria, stateToLGA } from "@/lib/statesAndLgas";
import { useEffect, useState } from "react";

interface FormComponentProps {
    data: any[];
    formData: any;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    country?: string,
    state?: string,
    lga?: string,
}

const FormComponent = ({ data, formData, handleChange, handleFile, country, state, lga }: FormComponentProps) => {
    const [countries, setCountries] = useState<any[]>([]);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const sortedCountries = data.map((c: any) => ({ value: c.name.common, label: c.name.common })).sort((a: any, b: any) => a.label.localeCompare(b.label));
                setCountries(sortedCountries);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const isNigeriaSelected = country ? formData.responses[country] === "Nigeria" : false;

    return (
        <div>
            {data.map((field) => (
                <label
                    htmlFor={field.id}
                    key={field.id}
                    className="block mb-4"
                >
                    <p>{field.label}</p>

                    {field.type === "text" && (
                        <Input
                            type="text"
                            id={field.id}
                            name={field.id}
                            value={formData.responses[field.id] || ""}
                            onChange={handleChange}
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            required
                        />
                    )}

                    {field.type === "number" && (
                        <Input
                            type="number"
                            id={field.id}
                            name={field.id}
                            value={formData.responses[field.id] || ""}
                            onChange={handleChange}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            required
                        />
                    )}

                    {field.type === "date" && (
                        <Input
                            type="date"
                            id={field.id}
                            name={field.id}
                            value={
                                formData.responses[field.id]
                                    ? String(formData.responses[field.id])
                                    : ""
                            }
                            onChange={handleChange}
                            required
                        />
                    )}

                    {field.type === "file" && (
                        <Input
                            type="file"
                            id={field.id}
                            name={field.id}
                            onChange={handleFile}
                            required
                        />
                    )}

                    {field.type === "select" && field.id === country && (
                        <select
                            id={field.id}
                            name={field.id}
                            value={formData.responses[field.id] || ""}
                            onChange={handleChange}
                            required
                            className="btn w-full pl-3 bg-transparent"
                        >
                            <option value="">Select {field.label}</option>
                            {countries.map((country) => (
                                <option key={country.value} value={country.value}>
                                    {country.value}
                                </option>
                            ))}
                        </select>
                    )}

                    {field.type === "select" && field.id === state && isNigeriaSelected && (
                        <select
                            id={field.id}
                            name={field.id}
                            value={formData.responses[field.id] || ""}
                            onChange={handleChange}
                            required
                            className="btn w-full pl-3 bg-transparent"
                        >
                            <option value="">Select {field.label}</option>
                            {statesInNigeria.map((state) => (
                                <option key={state} value={state}>
                                    {state} State
                                </option>
                            ))}
                        </select>
                    )}

                    {field.type === "select" && field.id === state && !isNigeriaSelected && (
                        <input
                            type="text"
                            id={field.id}
                            name={field.id}
                            value={formData.responses[field.id] || ""}
                            onChange={handleChange}
                            className="btn w-full pl-3 bg-transparent"
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            required
                        />
                    )}

                    {field.type === "select" && field.id === lga && isNigeriaSelected && (
                        <select
                            id={field.id}
                            name={field.id}
                            value={formData.responses[field.id] || ""}
                            onChange={handleChange}
                            required
                            className="btn w-full pl-3 bg-transparent"
                        >
                            <option value="">Select {field.label}</option>
                            {stateToLGA[state && formData.responses[state]]?.map((lga) => (
                                <option key={lga} value={lga}>
                                    {lga}
                                </option>
                            ))}
                        </select>
                    )}

                    {field.type === "select" && field.id === lga && !isNigeriaSelected && (
                        <input
                            type="text"
                            id={field.id}
                            name={field.id}
                            value={formData.responses[field.id] || ""}
                            onChange={handleChange}
                            className="btn w-full pl-3 bg-transparent"
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            required
                        />
                    )}

                    {field.type === "select" && field.options && field.id !== country && field.id !== state && field.id !== lga && (
                        <select
                            id={field.id}
                            name={field.id}
                            value={formData.responses[field.id] || ""}
                            onChange={handleChange}
                            required
                            className="btn w-full pl-3 bg-transparent"
                        >
                            <option value="">Select {field.label}</option>
                            {field.options.map((option: any) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                </label>
            ))}
        </div>
    )
}

export default FormComponent;