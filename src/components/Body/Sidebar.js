import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import $ from "jquery";

import { selectActive, setActive } from "../../features/Subreddits/subredditsSlice";
import SubredditList from "../../features/Subreddits/SubredditList";
import { selectFilter, setFilter, setSearchTerm } from "../../features/Posts/postsSlice";

const Sidebar = () => {
    const dispatch = useDispatch();
    const activeSub = useSelector(selectActive);
    const filter = useSelector(selectFilter);

    const handleActive = id => {
        dispatch(setActive(id));
        dispatch(setFilter("hot"));
        dispatch(setSearchTerm(""));
    }
    const handleFilter = filter => {
        dispatch(setFilter(filter));
    }

    const closeSidebar = () => {
        $(".sidebar").animate({
            right: `-100%`,
        }, 500);
    };

    useEffect(() => {
        closeSidebar();
    }, [dispatch, activeSub, filter])

    return (
        <div className="sidebar">
            <nav>
                <div>
                    <div className="sidebar-header">
                        <h2 id="sidebar-title">Subreddits</h2>
                        <svg className="sidebar-close" id="sidebar-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={closeSidebar}>
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/>
                        </svg>
                    </div>
                    <div className="search mobile">
                        <form>
                            <input type="search" />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                    <SubredditList handleActive={handleActive} handleFilter={handleFilter} />
                </div>
                <div className="credits">
                    <p>Web app built by <a href="https://davyk17.github.io/" target="_blank" rel="noreferrer">Davy Kamanzi</a></p>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;