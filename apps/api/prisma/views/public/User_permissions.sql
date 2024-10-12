CREATE materialized VIEW public.User_permissions as
select ur.user_id,
    p.id,
    p."name"
from "userRole" ur
    inner join "PermissionRole" pr on ur.rol_id = pr.role_id
    inner join "Permission" p ON pr.permission_id = p.id
    inner join "Roles" r on r.id = ur.rol_id;
CREATE UNIQUE INDEX idx_User_permissions ON public.User_permissions (id);
REFRESH MATERIALIZED VIEW CONCURRENTLY public.User_permissions