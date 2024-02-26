using Microsoft.EntityFrameworkCore;
using newWebAPI.Application.Data.Contexts;
using newWebAPI.Domain.Models;

namespace newWebAPI.Application.Data.Repositories
{
    public class AssignmentListRepository
    {

        private readonly MySQLContext _context;
        public AssignmentListRepository(MySQLContext context) {
            _context = context;
        }

        public async Task<AssignmentList> CreateAssignmentList(Domain.Models.AssignmentList assignmentList)
        {
            var ret = await _context.AssignmentList.AddAsync(assignmentList);

            await _context.SaveChangesAsync();

            ret.State = EntityState.Detached;

            return ret.Entity;
        }

        public async Task<List<AssignmentList>> GetListAssignmentListByUserId(string userId)
        {
            List<AssignmentList> listAssignmentList = await _context.AssignmentList.Include(a => a.User).Where(a => a.UserId == userId).ToListAsync();

            return listAssignmentList;
        }

        public async Task<AssignmentList> GetAssignmentListById(int assignmentListId)
        {
            AssignmentList? assignmentList = await _context.AssignmentList.Include(a => a.User).FirstOrDefaultAsync(a => a.Id == assignmentListId);

            return assignmentList!;
        }

        public async Task<int> UpdateAssignmentList(AssignmentList oldAssignmentList, AssignmentList newAssignmentList)
        {
            _context.Entry<AssignmentList>(oldAssignmentList).CurrentValues.SetValues(newAssignmentList);

            return await _context.SaveChangesAsync();

        }

        public async Task<int> DeleteAssignmentList(AssignmentList assignmentList)
        {
            _context.AssignmentList.Remove(assignmentList);

            return await _context.SaveChangesAsync();
        }
    }
}
