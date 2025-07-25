import React, { useEffect, useRef } from "react";
import { useFilterContext } from "../context/FilterContext";

const Searchbar = () => {
  const { toggleSearch, setToggleSearch, filters, setFilters } = useFilterContext();
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (toggleSearch && inputRef.current) inputRef.current.focus();
  }, [toggleSearch]);

  // Close on outside click
  useEffect(() => {
    if (!toggleSearch) return;
    const cb = e => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setToggleSearch(false);
    };
    document.addEventListener("mousedown", cb);
    return () => document.removeEventListener("mousedown", cb);
  }, [toggleSearch, setToggleSearch]);

  function handleInput(e) {
    setFilters(f => ({ ...f, searchQuery: e.target.value }));
  }

  // On Enter, close search bar
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setToggleSearch(false);
    }
  }

  if (!toggleSearch) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur transition-all">
      <div
        ref={wrapperRef}
        className="w-full max-w-xl px-0"
      >
        <div className="flex items-center bg-white rounded-full shadow-lg">
          <span className="pl-5 pr-3 flex items-center text-black">
            {/* Brave-style magnifier */}
            <svg width="24" height="24" stroke="currentColor" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="17" y2="17"/>
            </svg>
          </span>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search here..."
            spellCheck={false}
            autoComplete="off"
            value={filters.searchQuery || ""}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-black text-lg font-medium py-3 px-0 rounded-r-xl placeholder-gray-400 placeholder:font-light placeholder:italic placeholder:text-sm border-none outline-none caret-white
                       no-clear"
          />
        </div>
      </div>
      {/* Style block to hide input[type=search] clear icon */}
      <style>
        {`
          input[type="search"].no-clear::-webkit-search-decoration,
          input[type="search"].no-clear::-webkit-search-cancel-button,
          input[type="search"].no-clear::-webkit-search-results-button,
          input[type="search"].no-clear::-webkit-search-results-decoration {
              display: none;
          }
          input[type="search"].no-clear::-ms-clear {
              display: none;
              width: 0;
              height: 0;
          }
          input[type="search"].no-clear {
              /* Hide clear icon on Edge too */
              &::-ms-clear {display: none;}
            }
        `}
      </style>
    </div>
  );
};

export default Searchbar;
