// app/dashboard/profile/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../../lib/auth";
import { prisma } from "../../../../lib/prisma";

export default async function ProfilePage() {
  const session = await auth();
  const userId = (session?.user as any)?.id as string | undefined;

  if (!userId) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId! },
    select: {
      name: true,
      email: true,
      createdAt: true,
      onboardingCompleted: true,
      profile: {
        select: {
          targetRoles: true,
          regions: true,
          countries: true,
          city: true,
          workMode: true,
          cvFilename: true,
          cvUploadedAt: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const profile = user.profile;

  const targetRoles = profile?.targetRoles ?? [];
  const regions = profile?.regions ?? [];
  const countries = profile?.countries ?? [];

  const workModeLabel = profile?.workMode
    ? profile.workMode === "REMOTE"
      ? "Remote"
      : profile.workMode === "HYBRID"
      ? "Hybrid"
      : "On-site"
    : "Not set";

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
          My info
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Your account details and job-search preferences.
        </p>
      </div>

      {/* Basic profile */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Profile
        </h3>
        <dl className="grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Name</dt>
            <dd className="text-slate-900">
              {user.name || "Not set"}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Email</dt>
            <dd className="text-slate-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Account created</dt>
            <dd className="text-slate-900">
              {user.createdAt.toLocaleDateString()}
            </dd>
          </div>
          <div>
            <dt className="text-slate-500">Onboarding</dt>
            <dd className="text-slate-900">
              {user.onboardingCompleted ? "Completed" : "Not completed"}
            </dd>
          </div>
        </dl>
      </section>

      {/* Job search preferences */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">
            Job-search preferences
          </h3>
          {/* Future: edit button */}
          {/* <button className="text-xs text-violet-600 hover:underline">
            Edit
          </button> */}
        </div>

        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500 mb-1">Target roles</dt>
            <dd className="text-slate-900">
              {targetRoles.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {targetRoles.map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center rounded-full bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-slate-400">Not set</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-slate-500 mb-1">Regions</dt>
            <dd className="text-slate-900">
              {regions.length > 0 ? (
                regions.join(", ")
              ) : (
                <span className="text-slate-400">Not set</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-slate-500 mb-1">Countries</dt>
            <dd className="text-slate-900">
              {countries.length > 0 ? (
                countries.join(", ")
              ) : (
                <span className="text-slate-400">Not set</span>
              )}
            </dd>
          </div>

          <div>
            <dt className="text-slate-500 mb-1">City</dt>
            <dd className="text-slate-900">
              {profile?.city || <span className="text-slate-400">Not set</span>}
            </dd>
          </div>

          <div>
            <dt className="text-slate-500 mb-1">Work mode</dt>
            <dd className="text-slate-900">{workModeLabel}</dd>
          </div>
        </dl>
      </section>

      {/* CV section */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h3 className="text-sm font-semibold text-slate-900">
            CV
          </h3>
          {/* Later: re-upload / remove actions */}
        </div>

        {profile?.cvFilename ? (
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-slate-900">{profile.cvFilename}</p>
              <p className="text-xs text-slate-500">
                Uploaded{" "}
                {profile.cvUploadedAt
                  ? profile.cvUploadedAt.toLocaleDateString()
                  : "recently"}
              </p>
            </div>
            {/* Placeholder for download link once you store cvUrl */}
            <button className="text-xs font-medium text-violet-600 hover:underline">
              Re-upload soon
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-500">
            You haven&apos;t uploaded a CV yet. You can upload one from onboarding
            or a future editor here.
          </p>
        )}
      </section>
    </div>
  );
}
