import { AppLayout } from "@/components/layout/AppLayout"
import CollaboratorEditForm from "@/components/forms/CollaboratorEditForm"

interface EditCollaboratorPageProps {
  params: {
    id: string
  }
}

export default function EditCollaboratorPage({ params }: EditCollaboratorPageProps) {
  return (
    <AppLayout>
      <CollaboratorEditForm collaboratorId={params.id} />
    </AppLayout>
  )
}
