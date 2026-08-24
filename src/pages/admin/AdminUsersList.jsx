// import React, { useEffect, useState } from "react";
// import { Search, UserCheck } from "lucide-react";
// import { Badge } from "../../components/common/Badge";
// import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// import { fetchUsersList } from "../../redux/slices/userSlice";
// import toast from "react-hot-toast";
// export const AdminUsersList = () => {
//   const dispatch = useAppDispatch();
//   const { usersList, isLoading } = useAppSelector((state) => state.user);
//   const [searchTerm, setSearchTerm] = useState("");
//   useEffect(() => {
//     dispatch(fetchUsersList());
//   }, [dispatch]);
//   const filteredUsers = usersList.filter(
//     (u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.role.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 pb-12" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-black text-slate-900 dark:text-slate-100" }, "User Management"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Manage customers, vendor accounts, and system admin permissions")), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-soft flex items-center gap-3" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-slate-400 shrink-0" }), /* @__PURE__ */ React.createElement(
//     "input",
//     {
//       type: "text",
//       value: searchTerm,
//       onChange: (e) => setSearchTerm(e.target.value),
//       placeholder: "Search by user name, email, or role...",
//       className: "w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 focus:outline-none placeholder:text-slate-400"
//     }
//   )), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-soft" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "User"), /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "Email"), /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "Role"), /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "Account Status"), /* @__PURE__ */ React.createElement("th", { className: "p-4 text-center" }, "Action"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800" }, filteredUsers.map((u) => /* @__PURE__ */ React.createElement("tr", { key: u._id, className: "hover:bg-slate-50/50 dark:hover:bg-slate-800/30" }, /* @__PURE__ */ React.createElement("td", { className: "p-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("img", { src: u.avatar, alt: "", className: "w-9 h-9 rounded-xl object-cover" }), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900 dark:text-slate-100" }, u.name)), /* @__PURE__ */ React.createElement("td", { className: "p-4 text-slate-500" }, u.email), /* @__PURE__ */ React.createElement("td", { className: "p-4 uppercase font-bold" }, /* @__PURE__ */ React.createElement(Badge, { variant: u.role === "admin" ? "info" : u.role === "vendor" ? "warning" : "neutral" }, u.role)), /* @__PURE__ */ React.createElement("td", { className: "p-4" }, /* @__PURE__ */ React.createElement(Badge, { variant: u.isActive ? "success" : "danger" }, u.isActive ? "Active" : "Suspended")), /* @__PURE__ */ React.createElement("td", { className: "p-4 text-center" }, /* @__PURE__ */ React.createElement(
//     "button",
//     {
//       onClick: () => toast.success(`Updated status for ${u.name}`),
//       className: "p-2 text-slate-500 hover:text-emerald-600 rounded-xl"
//     },
//     /* @__PURE__ */ React.createElement(UserCheck, { className: "w-4 h-4" })
//   )))))))));
// };






import React, { useEffect, useState } from "react";
import { Search, UserCheck, Loader2, Trash2, Eye, Edit3  } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsersList } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Modal } from "../../components/common/Modal";
export const AdminUsersList = () => {
  const dispatch = useAppDispatch();
  // const { usersList, isLoading } = useAppSelector((state) => state.user);

  const [users,setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   dispatch(fetchUsersList());
  // }, [dispatch]);

  const [deleteId, setDeleteId] = useState(null);

  const [viewUser, setViewUser] = useState(null);

      const handleDelete = async () => {
      if (!deleteId) return;
      try {
        await axios.delete(`http://localhost:5000/delete/${deleteId}`); // <-- tomar actual delete route boshao
        setUsers((prev) => prev.filter((u) => u._id !== deleteId));
        toast.success("User removed successfully.");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete user");
      } finally {
        setDeleteId(null);
      }
    };

  useEffect(() => {
    async function getUsers() {
      try {
            const res = await axios.get('http://localhost:5000/allusers');
            console.log(res);
            setUsers(res?.data?.Userdata || []);

          } catch (err) {
            console.error(err);
            toast.error("Failed to load users");
          }finally {
        setIsLoading(false);
      }
    }
    getUsers();
  }, []);



  const filteredUsers = (users || []).filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())||
      // u.isHold.toLowerCase().includes(searchTerm.toLowerCase())||

      u.createdAt?.toLowerCase().includes(searchTerm.toLowerCase())

  );

  const handleStatusToggle = (u) => {
    // TODO: real thunk dispatch korte hobe, ex:
    // dispatch(updateUserStatus({ id: u._id, isActive: !u.isActive }))
    //   .unwrap()
    //   .then(() => toast.success(`Updated status for ${u.name}`))
    //   .catch(() => toast.error("Status update failed"));
    toast.success(`Updated status for ${u.name}`);
  };

  const formatJoinedDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          User Management
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage customers, vendor accounts, and system admin permissions
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-soft flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by user name, email, or role..."
          className="w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 focus:outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Role</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading users...
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-slate-400">
                    {searchTerm
                      ? "No users match your search."
                      : "No users found."}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                  >
                    <td className="p-4 flex items-center gap-3">
                      {/* <img
                        src={u.avatar}
                        alt=""
                        className="w-9 h-9 rounded-xl object-cover"
                      /> */}
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-slate-100">
                          {u.name}
                        </span>
                        <span className="text-slate-400 font-normal normal-case">
                          {u.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500">
                      {u.phoneNumber || "—"}
                    </td>
                    <td className="p-4 uppercase font-bold">
                      <Badge
                        variant={
                          u.role === "admin"
                            ? "info"
                            : u.role === "vendor"
                            ? "warning"
                            : "neutral"
                        }
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="p-4 text-slate-500">
                      {formatJoinedDate(u.createdAt)}
                    </td>
                    <td className="p-4">
                          <Badge
                          variant={u.ishold ? "danger" : "success"}
                          >
                          {u.ishold ? "Dective" : "Active"}
                          </Badge>
                    </td>
                    <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                      {/* View -> My Account */}
                      <button
                            onClick={() => setViewUser(u)}
                            className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                          >
                            <Eye className="w-4 h-4" />
                      </button>

                      {/* Delete -> Popup Confirm */}
                        <button
                        onClick={() => setDeleteId(u._id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl"
                        >
                        <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Confirm Delete User"
      >
        <div className="flex flex-col gap-4 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Are you sure you want to delete this user? This action cannot be undone.
          </p>
          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              onClick={() => setDeleteId(null)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700"
            >
              Delete User
            </button>
          </div>
        </div>
      </Modal>
      {/* View User Profile Modal */}
      <Modal
        isOpen={!!viewUser}
        onClose={() => setViewUser(null)}
        title="User Profile"
      >
        {viewUser && (
          <div className="flex flex-col gap-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center font-black text-emerald-600 text-lg">
                {viewUser.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-[10px]">
                  {viewUser.name}
                </p>
                <Badge
                  variant={
                    viewUser.role === "admin"
                      ? "info"
                      : viewUser.role === "vendor"
                      ? "warning"
                      : "neutral"
                  }
                >
                  {viewUser.role}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Email</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {viewUser.email || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Phone</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {viewUser.phoneNumber || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Status</span>
                <Badge variant={viewUser.ishold ? "danger" : "success"}>
                  {viewUser.ishold ? "Inactive" : "Active"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Verified</span>
                <Badge variant={viewUser.isVarified ? "success" : "danger"}>
                  {viewUser.isVarified ? "Verified" : "Not Verified"}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Joined</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {formatJoinedDate(viewUser.createdAt)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">User ID</span>
                <span className="font-mono text-[10px] text-slate-500">
                  {viewUser._id}
                </span>
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <button
                onClick={() => setViewUser(null)}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};