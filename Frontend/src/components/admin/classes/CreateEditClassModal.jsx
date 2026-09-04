import { Edit3, ImagePlus, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";

const CreateEditClassModal = ({ editingClass, onClose, onSave }) => {
  // const [name, setName] = useState(editingClass ? editingClass.name : "");
  // const [description, setDescription] = useState(
  //   editingClass ? editingClass.description : "",
  // );
  // const [duration, setDuration] = useState(
  //   editingClass ? editingClass.duration : "60 min",
  // );
  // const [status, setStatus] = useState(
  //   editingClass ? editingClass.status : "active",
  // );
  // const [errors, setErrors] = useState({});

  const [name, setName] = useState(editingClass ? editingClass.name : "");

  const [description, setDescription] = useState(
    editingClass ? editingClass.description : "",
  );

  const [duration, setDuration] = useState(
    editingClass ? editingClass.duration : "60 min",
  );

  const [status, setStatus] = useState(
    editingClass ? editingClass.status : "active",
  );

  const [category, setCategory] = useState(
    editingClass ? editingClass.category || "" : "",
  );

  const [level, setLevel] = useState(
    editingClass ? editingClass.level || "All Levels" : "All Levels",
  );

  const [image, setImage] = useState(
    editingClass ? editingClass.image || "" : "",
  );

  const [errors, setErrors] = useState({});

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newErrors = {};
  //   if (!name.trim()) newErrors.name = "Class name is required.";
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }
  //   onSave({ name, description, duration, status });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Class name is required.";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!category.trim()) {
      newErrors.category = "Category is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      duration,
      status,
      category: category.trim(),
      level,
      image: image.trim(),
    });
  };

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      className="modal-overlay fixed inset-0 z-[1000] w-screen h-screen flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <style>{`
      .modal-overlay {
        margin: 0 !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
      }

      .class-modal-scroll::-webkit-scrollbar {
        width: 6px;
      }

      .class-modal-scroll::-webkit-scrollbar-track {
        background: transparent;
      }

      .class-modal-scroll::-webkit-scrollbar-thumb {
        background: var(--border-color);
        border-radius: 999px;
      }

      .class-modal-scroll::-webkit-scrollbar-thumb:hover {
        background: var(--text-muted);
      }

      .class-modal-scroll {
        scrollbar-width: thin;
        scrollbar-color: var(--border-color) transparent;
      }
    `}</style>

      <div
        onClick={(e) => e.stopPropagation()}
        className="class-modal-scroll app-card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-5 border border-border-color"
      >
        <div className="flex items-center justify-between border-b border-border-color pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              {editingClass ? (
                <Edit3 className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-text-main text-base">
                {editingClass ? "Edit Class Category" : "Create New Class"}
              </h3>
              <p className="text-[11px] text-text-muted">
                Define yoga class parameters for your studio
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-main hover:bg-bg-main rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Class Name */}
          <div>
            <label className="block text-text-main font-semibold mb-1.5">
              CLASS NAME <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors({});
              }}
              placeholder="e.g. Morning Flow"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-bg-main border ${
                errors.name
                  ? "border-rose-500 ring-1 ring-rose-500"
                  : "border-border-color"
              } text-text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
            />
            {errors.name && (
              <p className="text-rose-500 text-[11px] mt-1 font-medium">
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-text-main font-semibold mb-1.5">
              DESCRIPTION <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A balanced practice focused on mobility, strength, and mindful movement."
              className="w-full px-3.5 py-2.5 rounded-xl bg-bg-main border border-border-color text-text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
            />
            {errors.description && (
              <p className="text-rose-500 text-[11px] mt-1 font-medium">
                {errors.description}
              </p>
            )}
          </div>

          {/* Category & Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-text-main font-semibold mb-1.5">
                CATEGORY <span className="text-rose-500">*</span>
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setErrors((prev) => ({ ...prev, category: "" }));
                }}
                placeholder="e.g. Yoga"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-bg-main border ${
                  errors.category
                    ? "border-rose-500 ring-1 ring-rose-500"
                    : "border-border-color"
                } text-text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
              />

              {errors.category && (
                <p className="text-rose-500 text-[11px] mt-1 font-medium">
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-text-main font-semibold mb-1.5">
                LEVEL
              </label>

              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-main border border-border-color text-text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          {/* Duration & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-text-main font-semibold mb-1.5">
                DURATION
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-main border border-border-color text-text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="30 min">30 minutes</option>
                <option value="45 min">45 minutes</option>
                <option value="60 min">60 minutes</option>
                <option value="75 min">75 minutes</option>
                <option value="90 min">90 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-text-main font-semibold mb-1.5">
                STATUS
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-bg-main border border-border-color text-text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-text-main font-semibold mb-1.5">
              COVER IMAGE (OPTIONAL)
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
                setErrors((prev) => ({ ...prev, image: "" }));
              }}
              placeholder="Paste image URL"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-bg-main border ${
                errors.image
                  ? "border-rose-500 ring-1 ring-rose-500"
                  : "border-border-color"
              } text-text-main focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all`}
            />

            {errors.image && (
              <p className="text-rose-500 text-[11px] mt-1 font-medium">
                {errors.image}
              </p>
            )}

            <p className="text-[10px] text-text-muted mt-1">
              Use a direct PNG, JPG, or WebP image URL.
            </p>
          </div>

          <div className="pt-3 border-t border-border-color flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-text-muted hover:text-text-main font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-[0.98]"
            >
              {editingClass ? "Save Changes" : "Create Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateEditClassModal;
