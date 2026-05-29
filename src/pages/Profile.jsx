import profileImage from '../assets/profile_img_1.png'
import { Card, PageHeader, PageSection } from '../components/ui/index.js'

export default function Profile() {
  return (
    <PageSection className="gap-6">
      <PageHeader
        eyebrow="Profile"
        subtitle="Manage the visible account holder details for this workspace."
        title="Profile"
      />
      <Card className="flex flex-col gap-5 sm:flex-row sm:items-center" padded="md">
        <img
          alt="Cony profile"
          className="h-20 w-20 rounded-full border-2 border-[#4B2AAD]/30 object-cover shadow-md ring-2 ring-[#4B2AAD]/20"
          src={profileImage}
        />
        <div>
          <p className="text-slate-500">Account holder</p>
          <strong className="block text-2xl font-semibold text-slate-900">Cony</strong>
          <span className="text-slate-500">NEXORA Finance Workspace</span>
        </div>
      </Card>
    </PageSection>
  )
}
