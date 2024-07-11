export default function mediumText(text: String) {
  return (
    <div className="px-6 py-4">
      <ul className="flex flex-col md:flex-row gap-3">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li
          onMouseOver={() => setIsFocused({ ...isFocused, cpsc: true })}
          onMouseOut={() => setIsFocused({ ...isFocused, cpsc: false })}
        >
          <span className="hover:text-gray-300 hover:delay-500 ">CPSC</span>
          {isFocused.cpsc && (
            <ul className="absolute bg-indigo-800">
              <li>
                <Link href={""}>Vice Principle</Link>
              </li>
              <li>
                <Link href={""}>Governing Body</Link>
              </li>
              <li>
                <Link href={""}>Faculty</Link>
              </li>
              <li>
                <Link href={""}>Staff</Link>
              </li>
              <li>
                <Link href={""}>Commitee</Link>
              </li>
            </ul>
          )}
        </li>
        <li
          onMouseOver={() => setIsFocused({ ...isFocused, acdemics: true })}
          onMouseOut={() => setIsFocused({ ...isFocused, acdemics: false })}
        >
          <span>Academics</span>
          {isFocused.acdemics && (
            <ul className="absolute bg-indigo-900 px-4 py-2">
              <li
                onMouseOver={() => setIsFocused({ ...isFocused, ct: true })}
                onMouseOut={() => setIsFocused({ ...isFocused, ct: false })}
              >
                <span>Class Teacher</span>

                {isFocused.ct && (
                  <ul className="absolute bg-indigo-900 ml-20">
                    <li
                      onMouseOver={() =>
                        setIsFocused({ ...isFocused, ctPrimary: true })
                      }
                      onMouseOut={() =>
                        setIsFocused({ ...isFocused, ctPrimary: false })
                      }
                    >
                      <span>Primary</span>

                      {isFocused.ctPrimary && (
                        <ul className="absolute bg-indigo-900 ml-14">
                          <li>
                            <Link href={""}>1</Link>
                          </li>
                          <li>
                            <Link href={""}>2</Link>
                          </li>
                          <li>
                            <Link href={""}>3</Link>
                          </li>
                          <li>
                            <Link href={""}>4</Link>
                          </li>
                          <li>
                            <Link href={""}>5</Link>
                          </li>
                        </ul>
                      )}
                    </li>

                    <li>
                      <span>School</span>
                      <ul className="absolute bg-indigo-900 ml-14 hidden">
                        <li>
                          <Link href={""}>6</Link>
                        </li>
                        <li>
                          <Link href={""}>7</Link>
                        </li>
                        <li>
                          <Link href={""}>8</Link>
                        </li>
                        <li>
                          <Link href={""}>9</Link>
                        </li>
                        <li>
                          <Link href={""}>10</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <span>College</span>
                      <ul className="absolute bg-indigo-900 ml-14 hidden">
                        <li>
                          <Link href={""}>11</Link>
                        </li>
                        <li>
                          <Link href={""}>12</Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                )}
              </li>
              <li></li>

              <li></li>
              <li></li>
              <li></li>
            </ul>
          )}
        </li>
        <li>Achievements</li>
        <li>Login</li>
      </ul>
    </div>
  );
}
