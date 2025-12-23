import styles from "./Sidebar.module.css";

export default function Sidebar({
  username,
  groups,
  currentGroup,
  onGroupSelect,
  addGroup,
}) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <div className={styles.avatar}>
            <div className={styles.avatarPlaceholder}></div>
            <div className={styles.onlineIndicator}></div>
          </div>
          <div>
            <div className={styles.profileName}>{username}</div>
            <div className={styles.status}>Online</div>
          </div>
        </div>
      </div>
      <button className={styles.newGroupBtn} onClick={addGroup}>
        New Group
      </button>
      <div className={styles.groupsList}>
        {groups.map((group) => (
          <div
            key={group.id}
            className={`${styles.groupItem} ${
              group.id === currentGroup.id ? styles.activeGroup : ""
            }`}
            onClick={() => onGroupSelect(group)}
          >
            <div className={styles.groupAvatar}></div>
            <div className={styles.groupInfo}>
              <div className={styles.groupHeader}>
                <span className={styles.groupName}>{group.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
