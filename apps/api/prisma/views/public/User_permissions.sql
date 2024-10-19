CREATE materialized VIEW public.User_permissions as
select u.id as user_id,
    p.id as id,
    p."name"
from "Permission" p
    inner join "PermissionRole" pr on p.id = pr.permission_id
    inner join "Roles" r on r.id = pr.role_id
    inner join "User" u on u.role_id = r.id;
CREATE UNIQUE INDEX idx_User_permissions ON public.User_permissions (user_id, id);
REFRESH MATERIALIZED VIEW CONCURRENTLY public.User_permissions;