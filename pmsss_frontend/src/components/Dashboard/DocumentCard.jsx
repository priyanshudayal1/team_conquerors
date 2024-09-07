import { CloudUpload, Visibility, Edit } from '@mui/icons-material';

const DocumentCard = ({ document, onUpload, onView, onEdit }) => {
  const handleDrop = (acceptedFiles) => {
    if (onUpload) {
      onUpload(acceptedFiles);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-4">{document.name}</h3>
      <div className="flex space-x-4 mb-4">
        <button onClick={onView} className="text-blue-500 hover:text-blue-700">
          <Visibility />
        </button>
        <button onClick={onEdit} className="text-green-500 hover:text-green-700">
          <Edit />
        </button>
      </div>
      <div
        {...document.getRootProps({ onDrop: handleDrop })}
        className="border-dashed border-2 border-gray-300 p-4 w-full text-center cursor-pointer"
      >
        <input {...document.getInputProps()} />
        <CloudUpload className="text-gray-500" />
        <p className="text-gray-500">Drag & drop or click to upload</p>
      </div>
    </div>
  );
};

export default DocumentCard;