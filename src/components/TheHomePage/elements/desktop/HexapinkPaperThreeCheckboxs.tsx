import "../../../../style/TheHomePage/font.css";
export default function HexapinkPaperThreeCheckboxs() {
    return (
      <fieldset>
        <div className="lg:space-y-9 space-y-3">
          <div className="flex gap-3">
            <div className="flex h-6 shrink-0 items-center">
              <div className="group grid size-5 grid-cols-1">
                <input
                  defaultChecked
                  id="comments"
                  name="comments"
                  type="checkbox"
                  aria-describedby="comments-description"
                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-[#FF6699] checked:bg-[#FF6699] indeterminate:border-[#FF6699] indeterminate:bg-[#FF6699] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6699] disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                />
                <svg
                  fill="none"
                  viewBox="0 0 14 14"
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:checked]:opacity-100"
                  />
                  <path
                    d="M3 7H11"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                  />
                </svg>
              </div>
            </div>
            <div className="text-sm/6">
              <label htmlFor="comments" className="font-medium text-[#666666] text-[20px]">
                Balance
              </label>{' '}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 shrink-0 items-center">
              <div className="group grid size-5 grid-cols-1">
                <input
                  id="candidates"
                  name="candidates"
                  type="checkbox"
                  aria-describedby="candidates-description"
                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-[#FF6699] checked:bg-[#FF6699] indeterminate:border-[#FF6699] indeterminate:bg-[#FF6699] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6699] disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                />
                <svg
                  fill="none"
                  viewBox="0 0 14 14"
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:checked]:opacity-100"
                  />
                  <path
                    d="M3 7H11"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                  />
                </svg>
              </div>
            </div>
            <div className="text-sm/6">
              <label htmlFor="candidates" className="font-medium text-[#666666] text-[20px]">
                Credit Card
              </label>{' '}
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex h-6 shrink-0 items-center">
              <div className="group grid size-5 grid-cols-1">
                <input
                  id="offers"
                  name="offers"
                  type="checkbox"
                  aria-describedby="offers-description"
                  className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-[#FF6699] checked:bg-[#FF6699] indeterminate:border-[#FF6699] indeterminate:bg-[#FF6699] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6699] disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                />
                <svg
                  fill="none"
                  viewBox="0 0 14 14"
                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                >
                  <path
                    d="M3 8L6 11L11 3.5"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:checked]:opacity-100"
                  />
                  <path
                    d="M3 7H11"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-0 group-has-[:indeterminate]:opacity-100"
                  />
                </svg>
              </div>
            </div>
            <div className="text-sm/6">
              <label htmlFor="offers" className="font-medium text-[#666666] text-[20px]">
                Bank Transfer
              </label>{' '}
            </div>
          </div>
        </div>
      </fieldset>
    )
  }
  
