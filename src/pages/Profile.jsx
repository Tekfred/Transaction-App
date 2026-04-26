import profileImage from '../assets/profile_img_1.png'

export default function Profile() {
  return (
    <section className="grid gap-4">
      <h2 className="text-3xl font-bold text-slate-900">Profile</h2>
      <div className="flex flex-col gap-5 rounded-[22px] border border-slate-900/8 bg-white/90 p-6 shadow-[0_18px_44px_rgba(31,53,88,0.08)] sm:flex-row sm:items-center">
        <img
          alt="Cony profile"
          className="h-20 w-20 rounded-full border-2 border-[#4B2AAD]/30 object-cover shadow-md ring-2 ring-[#4B2AAD]/20"
          src={profileImage}
        />
        <div>
          <p className="text-slate-500">Account holder</p>
          <strong className="block text-2xl font-semibold text-slate-900">Cony</strong>
          <span className="text-slate-500">Personal banking workspace</span>
        </div>
      </div>
    </section>
  )
}
