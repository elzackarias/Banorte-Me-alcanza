import { X } from 'lucide-react';
import { formatFecha } from '../views/yo/formatters.js';

// Lista de conversaciones pasadas, tipo el panel lateral de ChatGPT/Claude:
// elegir una carga su historial (AsistenteView se encarga de eso) y "Nueva
// conversación" simplemente limpia la selección — el próximo mensaje que se
// mande, al no llevar conversacion_id, hace que el backend cree una
// conversación real (mismo camino que ya usa el primer mensaje de siempre).
//
// `isOpen`/`onClose` solo importan en mobile (ver .conversation-sidebar en
// index.css): ahí el sidebar es un drawer superpuesto en vez de una columna
// fija, así que necesita poder cerrarse solo. En desktop se ignoran (el
// sidebar siempre está visible) salvo por el botón de cerrar, que ahí ni
// se muestra.
export default function ConversationSidebar({ conversaciones, activeId, onSelect, onNueva, isOpen, onClose }) {
  return (
    <nav
      className={`conversation-sidebar ${isOpen ? 'conversation-sidebar-open' : ''}`}
      aria-label="Historial de conversaciones"
    >
      <div className="conversation-sidebar-header">
        <button type="button" className="conversation-nueva" onClick={onNueva}>
          + Nueva conversación
        </button>
        <button
          type="button"
          className="conversation-sidebar-close"
          onClick={onClose}
          aria-label="Cerrar historial de conversaciones"
        >
          <X size={18} />
        </button>
      </div>
      <ul className="conversation-list">
        {(conversaciones ?? []).map((conversacion) => (
          <li key={conversacion.id}>
            <button
              type="button"
              className={`conversation-item ${conversacion.id === activeId ? 'conversation-item-active' : ''}`}
              onClick={() => onSelect(conversacion.id)}
            >
              <span className="conversation-item-titulo">{conversacion.titulo}</span>
              <span className="conversation-item-fecha">{formatFecha(conversacion.updated_at?.slice(0, 10))}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
