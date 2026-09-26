import { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

export default function Settings() {
  const { adminSession } = useAdmin()
  const [notifications, setNotifications] = useState({ newOrders: true, lowStock: true, contactMessages: true })

  return (
    <div className="admin-panel">
      <div className="admin-section admin-form-panel">
        <div className="section-heading"><h2>Admin settings</h2></div>
        <div className="admin-settings-grid">
          <div className="admin-card"><h3>Admin account</h3><p>{adminSession?.name}</p><p>{adminSession?.email}</p></div>
          <div className="admin-card"><h3>Notifications</h3><label className="toggle-row"><input type="checkbox" checked={notifications.newOrders} onChange={() => setNotifications((prev) => ({ ...prev, newOrders: !prev.newOrders }))} />New orders alert</label><label className="toggle-row"><input type="checkbox" checked={notifications.lowStock} onChange={() => setNotifications((prev) => ({ ...prev, lowStock: !prev.lowStock }))} />Low stock alert</label><label className="toggle-row"><input type="checkbox" checked={notifications.contactMessages} onChange={() => setNotifications((prev) => ({ ...prev, contactMessages: !prev.contactMessages }))} />Customer contact messages</label></div>
        </div>
      </div>
    </div>
  )
}
