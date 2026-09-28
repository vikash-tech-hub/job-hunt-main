import Swal from "sweetalert2";

// Custom styled SweetAlert2 mixin
export const showSuccessAlert = (title, text = "") => {
  return Swal.fire({
    title: `<span class="text-xl font-bold text-slate-900">${title}</span>`,
    html: text ? `<span class="text-sm text-slate-600">${text}</span>` : undefined,
    icon: "success",
    confirmButtonText: "Awesome!",
    buttonsStyling: false,
    customClass: {
      popup: "rounded-3xl p-6 shadow-2xl border border-slate-100 font-sans",
      confirmButton: "px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer",
    },
  });
};

export const showErrorAlert = (title, text = "") => {
  return Swal.fire({
    title: `<span class="text-xl font-bold text-slate-900">${title}</span>`,
    html: text ? `<span class="text-sm text-slate-600">${text}</span>` : undefined,
    icon: "error",
    confirmButtonText: "Got it",
    buttonsStyling: false,
    customClass: {
      popup: "rounded-3xl p-6 shadow-2xl border border-slate-100 font-sans",
      confirmButton: "px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer",
    },
  });
};

export const showConfirmAlert = async ({
  title,
  text,
  confirmButtonText = "Yes, continue",
  cancelButtonText = "Cancel",
  icon = "warning",
}) => {
  const result = await Swal.fire({
    title: `<span class="text-xl font-bold text-slate-900">${title}</span>`,
    html: text ? `<span class="text-sm text-slate-600">${text}</span>` : undefined,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    buttonsStyling: false,
    customClass: {
      popup: "rounded-3xl p-6 shadow-2xl border border-slate-100 font-sans",
      confirmButton: "px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-md transition-all cursor-pointer mr-3",
      cancelButton: "px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer",
    },
  });

  return result.isConfirmed;
};

export const showToast = (title, icon = "success") => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    customClass: {
      popup: "rounded-2xl shadow-xl border border-slate-100 font-sans text-sm",
    },
  });

  Toast.fire({
    icon,
    title,
  });
};

export default Swal;
