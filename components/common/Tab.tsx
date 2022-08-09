import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { useMemo } from "react";

export interface TabProps {
    items: {
        title: string | ReactNode;
        content?: ReactNode;
    }[];
    activeIndex?: number;
    onTabClick: (index: number) => void;
    icons?: { index: number; type: ReactNode }[];
}

export const Tab = ({ items, activeIndex, onTabClick, icons }: TabProps) => {
    const router = useRouter();

    const handleTabClick = (index: number) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, activeTab: index },
            },
            undefined,
            { scroll: false }
        );
        onTabClick(index);
    };
    const currentActiveIndex = useMemo(() => {
        const { activeTab } = router.query;
        return activeTab && !isNaN(Number(activeTab))
            ? Number(activeTab)
            : activeIndex;
    }, [activeIndex, router.query]);

    const renderTabItems = () => {
        return (
            <>
                {items.map((item, index) => (
                    <button
                        data-is-active={JSON.stringify(
                            index === currentActiveIndex
                        )}
                        className="custom-tab__headers--btn"
                        onClick={() => handleTabClick(index)}
                        key={index}
                    >
                        {item.title}
                    </button>
                ))}

                {icons?.map((icon) => (
                    <div key={icon.index}>{icon.type}</div>
                ))}
            </>
        );
    };
    return (
        <div className="custom-tab">
            <div className="custom-tab__headers">{renderTabItems()}</div>
            {currentActiveIndex !== undefined &&
            typeof currentActiveIndex === "number" &&
            items[currentActiveIndex] ? (
                <div className="custom-tab__content">
                    {items[currentActiveIndex].content}
                </div>
            ) : null}
        </div>
    );
};
