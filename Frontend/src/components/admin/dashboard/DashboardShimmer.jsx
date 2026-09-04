import React from "react";
import { Sparkles } from "lucide-react";

/**
 * Reusable Skeleton Component
 *
 * The shimmer automatically adapts to the existing
 * AdminLayout theme:
 *
 * .admin-root[data-admin-theme="light"]
 * .admin-root[data-admin-theme="dark"]
 */
const Skeleton = ({
  className = "",
  rounded = "rounded-md",
  speed = "normal",
}) => {
  const animationDuration =
    speed === "fast"
      ? "1.1s"
      : speed === "slow"
      ? "2.4s"
      : "1.6s";

  return (
    <div
      className={`skeleton-shimmer relative overflow-hidden ${rounded} ${className}`}
    >
      <div
        className="skeleton-shimmer-wave absolute inset-0 -translate-x-full"
        style={{
          animationDuration,
        }}
      />
    </div>
  );
};

const DashboardSkeleton = ({ shimmerSpeed = "fast" }) => {
  return (
    <div className="dashboard-skeleton space-y-8 w-full animate-fadeIn">
      {/* -------------------------------------------------- */}
      {/* HERO */}
      {/* -------------------------------------------------- */}

      <section className="skeleton-card flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-8 rounded-2xl border shadow-sm">
        <div className="space-y-3.5 w-full max-w-md">
          <div className="flex items-center gap-2">
            <Skeleton
              className="w-4 h-4"
              rounded="rounded-md"
              speed={shimmerSpeed}
            />

            <Skeleton
              className="w-36 h-4"
              rounded="rounded-md"
              speed={shimmerSpeed}
            />
          </div>

          <Skeleton
            className="w-64 sm:w-72 h-9"
            rounded="rounded-xl"
            speed={shimmerSpeed}
          />

          <Skeleton
            className="w-full sm:w-80 h-4"
            rounded="rounded-md"
            speed={shimmerSpeed}
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Skeleton
            className="w-36 h-11"
            rounded="rounded-xl"
            speed={shimmerSpeed}
          />

          <Skeleton
            className="w-28 h-11"
            rounded="rounded-xl"
            speed={shimmerSpeed}
          />

          <Skeleton
            className="w-36 h-11"
            rounded="rounded-xl"
            speed={shimmerSpeed}
          />
        </div>
      </section>

      {/* -------------------------------------------------- */}
      {/* STATS */}
      {/* -------------------------------------------------- */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="skeleton-card p-6 rounded-2xl border shadow-sm flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between mb-4">
              <Skeleton
                className="w-28 h-4"
                rounded="rounded-md"
                speed={shimmerSpeed}
              />

              <Skeleton
                className="w-10 h-10"
                rounded="rounded-xl"
                speed={shimmerSpeed}
              />
            </div>

            <div>
              <Skeleton
                className="w-14 h-8 mb-2"
                rounded="rounded-lg"
                speed={shimmerSpeed}
              />

              <Skeleton
                className="w-36 h-3.5"
                rounded="rounded-md"
                speed={shimmerSpeed}
              />
            </div>
          </div>
        ))}
      </div>

      {/* -------------------------------------------------- */}
      {/* MAIN GRID */}
      {/* -------------------------------------------------- */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* ================================================== */}
        {/* LEFT COLUMN */}
        {/* ================================================== */}

        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Today's Sessions */}

          <div className="skeleton-card p-7 rounded-2xl border shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b skeleton-divider mb-5">
                <div className="flex items-center gap-3">
                  <Skeleton
                    className="w-9 h-9"
                    rounded="rounded-xl"
                    speed={shimmerSpeed}
                  />

                  <Skeleton
                    className="w-36 h-5"
                    rounded="rounded-md"
                    speed={shimmerSpeed}
                  />
                </div>

                <Skeleton
                  className="w-24 h-4"
                  rounded="rounded-md"
                  speed={shimmerSpeed}
                />
              </div>

              <div className="py-10 text-center flex flex-col items-center justify-center space-y-3">
                <Skeleton
                  className="w-12 h-12"
                  rounded="rounded-2xl"
                  speed={shimmerSpeed}
                />

                <Skeleton
                  className="w-48 h-5"
                  rounded="rounded-md"
                  speed={shimmerSpeed}
                />

                <Skeleton
                  className="w-64 h-4"
                  rounded="rounded-md"
                  speed={shimmerSpeed}
                />
              </div>
            </div>
          </div>

          {/* Booking + Revenue */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {/* Booking Overview */}

            <div className="skeleton-card p-7 rounded-2xl border shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <Skeleton
                    className="w-32 h-5"
                    rounded="rounded-md"
                    speed={shimmerSpeed}
                  />

                  <Skeleton
                    className="w-14 h-4"
                    rounded="rounded-md"
                    speed={shimmerSpeed}
                  />
                </div>

                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="skeleton-inner flex justify-between items-center p-3 rounded-xl border"
                    >
                      <Skeleton
                        className="w-32 h-4"
                        rounded="rounded-md"
                        speed={shimmerSpeed}
                      />

                      <Skeleton
                        className="w-6 h-5"
                        rounded="rounded-md"
                        speed={shimmerSpeed}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-5 border-t skeleton-divider flex items-center gap-2">
                <Skeleton
                  className="w-2.5 h-2.5"
                  rounded="rounded-full"
                  speed={shimmerSpeed}
                />

                <Skeleton
                  className="w-44 h-3.5"
                  rounded="rounded-md"
                  speed={shimmerSpeed}
                />
              </div>
            </div>

            {/* Revenue Overview */}

            <div className="skeleton-card p-7 rounded-2xl border shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <Skeleton
                    className="w-32 h-5"
                    rounded="rounded-md"
                    speed={shimmerSpeed}
                  />

                  <Skeleton
                    className="w-16 h-4"
                    rounded="rounded-md"
                    speed={shimmerSpeed}
                  />
                </div>

                <div className="space-y-2 mb-5">
                  <Skeleton
                    className="w-24 h-3.5"
                    rounded="rounded-md"
                    speed={shimmerSpeed}
                  />

                  <Skeleton
                    className="w-36 h-8"
                    rounded="rounded-lg"
                    speed={shimmerSpeed}
                  />

                  <Skeleton
                    className="w-40 h-3.5"
                    rounded="rounded-md"
                    speed={shimmerSpeed}
                  />
                </div>

                <Skeleton
                  className="w-full h-3"
                  rounded="rounded-full"
                  speed={shimmerSpeed}
                />
              </div>

              <div className="flex items-center justify-between pt-4 mt-5 border-t skeleton-divider">
                <Skeleton
                  className="w-20 h-4"
                  rounded="rounded-md"
                  speed={shimmerSpeed}
                />

                <Skeleton
                  className="w-28 h-4"
                  rounded="rounded-md"
                  speed={shimmerSpeed}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================================================== */}
        {/* RIGHT COLUMN */}
        {/* ================================================== */}

        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {/* Today's Capacity */}

          <div className="skeleton-card p-6 rounded-2xl border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <Skeleton
                className="w-28 h-5"
                rounded="rounded-md"
                speed={shimmerSpeed}
              />

              <Skeleton
                className="w-16 h-5"
                rounded="rounded-md"
                speed={shimmerSpeed}
              />
            </div>

            <Skeleton
              className="w-36 h-8 mb-3"
              rounded="rounded-lg"
              speed={shimmerSpeed}
            />

            <Skeleton
              className="w-full h-2.5 mb-4"
              rounded="rounded-full"
              speed={shimmerSpeed}
            />

            <div className="space-y-3 border-t skeleton-divider pt-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex justify-between items-center"
                >
                  <Skeleton
                    className="w-28 h-4"
                    rounded="rounded-md"
                    speed={shimmerSpeed}
                  />

                  <Skeleton
                    className="w-8 h-4"
                    rounded="rounded-md"
                    speed={shimmerSpeed}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}

          <div className="skeleton-card p-6 rounded-2xl border shadow-sm">
            <Skeleton
              className="w-36 h-5 mb-4"
              rounded="rounded-md"
              speed={shimmerSpeed}
            />

            <div className="space-y-3 max-h-[300px] overflow-hidden">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="skeleton-inner p-3.5 rounded-xl border flex items-center justify-between"
                >
                  <div className="space-y-2">
                    <Skeleton
                      className="w-32 h-4"
                      rounded="rounded-md"
                      speed={shimmerSpeed}
                    />

                    <Skeleton
                      className="w-44 h-3"
                      rounded="rounded-md"
                      speed={shimmerSpeed}
                    />
                  </div>

                  <Skeleton
                    className="w-14 h-7"
                    rounded="rounded-lg"
                    speed={shimmerSpeed}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}

          <div className="skeleton-card p-6 rounded-2xl border shadow-sm">
            <Skeleton
              className="w-28 h-5 mb-4"
              rounded="rounded-md"
              speed={shimmerSpeed}
            />

            <div className="grid grid-cols-2 gap-3">
              {[1, 2, 3, 4].map((item) => (
                <Skeleton
                  key={item}
                  className="h-11"
                  rounded="rounded-xl"
                  speed={shimmerSpeed}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity */}

          <div className="skeleton-card p-6 rounded-2xl border shadow-sm flex-1 flex flex-col justify-center items-center min-h-[100px]">
            <Skeleton
              className="w-36 h-4"
              rounded="rounded-md"
              speed={shimmerSpeed}
            />
          </div>
        </div>
      </div>
    </div>
  );
};


const DashboardLoading = () => {
  return (
    <>
      <style>
        {`
          /* --------------------------------------------- */
          /* SHIMMER ANIMATION                             */
          /* --------------------------------------------- */

          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }

            100% {
              transform: translateX(100%);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(6px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.35s ease-out forwards;
          }

          /* --------------------------------------------- */
          /* LIGHT THEME                                   */
          /* --------------------------------------------- */

          .admin-root[data-admin-theme="light"] .skeleton-card {
            background: rgb(255 255 255);
            border-color: rgb(226 232 240 / 0.9);
          }

          .admin-root[data-admin-theme="light"] .skeleton-inner {
            background: rgb(248 250 252);
            border-color: rgb(241 245 249);
          }

          .admin-root[data-admin-theme="light"] .skeleton-divider {
            border-color: rgb(241 245 249);
          }

          .admin-root[data-admin-theme="light"] .skeleton-shimmer {
            background: rgb(226 232 240 / 0.8);
          }

          .admin-root[data-admin-theme="light"] .skeleton-shimmer-wave {
            background: linear-gradient(
              90deg,
              transparent,
              rgb(255 255 255 / 0.7),
              transparent
            );
          }

          /* --------------------------------------------- */
          /* DARK THEME                                    */
          /* --------------------------------------------- */

          .admin-root[data-admin-theme="dark"] .skeleton-card {
            background: rgb(15 23 42);
            border-color: rgb(30 41 59);
          }

          .admin-root[data-admin-theme="dark"] .skeleton-inner {
            background: rgb(30 41 59 / 0.45);
            border-color: rgb(30 41 59);
          }

          .admin-root[data-admin-theme="dark"] .skeleton-divider {
            border-color: rgb(30 41 59 / 0.8);
          }

          .admin-root[data-admin-theme="dark"] .skeleton-shimmer {
            background: rgb(51 65 85 / 0.8);
          }

          .admin-root[data-admin-theme="dark"] .skeleton-shimmer-wave {
            background: linear-gradient(
              90deg,
              transparent,
              rgb(255 255 255 / 0.1),
              transparent
            );
          }

          /* --------------------------------------------- */
          /* SHIMMER WAVE                                  */
          /* --------------------------------------------- */

          .skeleton-shimmer-wave {
            animation: shimmer 1.1s infinite;
            will-change: transform;
          }
        `}
      </style>

      <DashboardSkeleton shimmerSpeed="fast" />
    </>
  );
};

export default DashboardLoading;